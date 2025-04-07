import type { Signal } from "@preact/signals";
import type { Application } from "~/old/lib/application.ts";
import { match, P } from "ts-pattern";
import { createRestAPIClient, type mastodon } from "masto";
import DOMPurify from "dompurify";

import {
  accountLookup,
  buildAuthorizationUrl,
  getAccessToken,
  getAccountFollowing,
  getAllFollowing,
  getClientToken,
  registerApplication,
  verifyCredentials,
} from "../lib/application.ts";

import {
  batch,
  computed,
  effect,
  signal,
  untracked,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";
import { parseMastodonUser } from "../lib/parseMastodonUser.ts";

interface AccessToken {
  access_token: string;
  created_at: number;
  scope: string;
  token_type: string;
}

const Main = () => {
  const username = useSignal<string | null>(null);
  const domain = useSignal<string | null>(null);
  const application = useSignal<Application | null>(null);
  const accessToken = useSignal<AccessToken | null>(null);
  const usersNotFollowedBy = useSignal<any[]>([]);
  const currentDetails = useSignal<mastodon.v1.Account | null>(null);
  const mastoClient = useSignal<any>(null);

  const url = computed(() => {
    if (!username.value || !domain.value) {
      return null;
    }

    const baseUrl = `https://${domain.value}`;
    return new URL(baseUrl);
  });

  const authHref = computed(() => {
    if (!url.value || !application.value) {
      return null;
    }

    const authUrl = buildAuthorizationUrl(
      url.value.origin,
      application.value.client_id,
    );

    return authUrl;
  });

  const isAuthed = computed(() => {
    if (!accessToken.value) return false;
    return true;
  });

  const currentUserNotFollowedBy = useComputed(() => {
    if (!usersNotFollowedBy.value) return null;
    const notFollowedBy = usersNotFollowedBy.value;
    return notFollowedBy[0];
  });

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    // Get the form and input element
    const form = event.target as HTMLFormElement;
    const inputValue = form.querySelector("input")?.value || "";

    // Parse the input value
    const parsed = parseMastodonUser(inputValue);

    // Store in localStorage
    localStorage.setItem("user-info", JSON.stringify(parsed));

    // Update the signals
    batch(() => {
      username.value = parsed?.username || "";
      domain.value = parsed?.domain || "";
    });
  };

  const handleAuthSubmit = async (event: Event) => {
    event.preventDefault();

    // Get the form and input element
    const form = event.target as HTMLFormElement;
    const inputValue = form.querySelector("input")?.value || "";

    if (!url.value || !application.value || !username.value) return;

    const token = await getAccessToken({
      baseUrl: url.value?.origin,
      clientId: application.value?.client_id,
      clientSecret: application.value?.client_secret,
      code: inputValue,
    });

    // Cache the access token in local storage
    const storageKey = `access-token:${username.value}@${url.value.host}`;
    localStorage.setItem(storageKey, JSON.stringify(token));

    accessToken.value = token;
  };

  // Register application
  useSignalEffect(() => {
    if (!url.value || !username.value) return;

    const applicationStorageKey = `application:${url.value.host}`;
    const cachedApplication = localStorage.getItem(applicationStorageKey);

    match(cachedApplication)
      .with(null, async () => {
        if (!url.value) return null;
        const app = await registerApplication(url.value);

        localStorage.setItem(applicationStorageKey, JSON.stringify(app));

        application.value = app;
      })
      .with(P.string, (cached) => {
        const app = JSON.parse(cached);
        application.value = app;
      })
      .exhaustive();
  });

  // Initialisation (runs once, checks for access-token)
  useSignalEffect(() => {
    untracked(() => {
      // Check local storage for saved user data
      const userInfo = localStorage.getItem("user-info");

      if (userInfo) {
        const parsed = JSON.parse(userInfo);

        batch(() => {
          username.value = parsed.username;
          domain.value = parsed.domain;
        });
      }

      // Check local storage for saved access token
      const storageKey = `access-token:${username.value}@${domain.value}`;
      const cachedToken = localStorage.getItem(storageKey);

      if (cachedToken) {
        const token = JSON.parse(cachedToken);
        accessToken.value = token;
      }
    });
  });

  useSignalEffect(() => {
    if (!accessToken.value) return;
    untracked(() => accessTokenEffect());
  });

  const accessTokenEffect = async () => {
    const masto = createRestAPIClient({
      url: url.value?.origin || "",
      accessToken: accessToken.value?.access_token || "",
    });

    console.log("Masto client created:", masto);

    mastoClient.value = masto;

    const userAccount = await masto.v1.accounts.verifyCredentials();
    console.log("Result:", userAccount);

    // Get accounts the user is following
    const followingPaginator = masto.v1.accounts.$select(userAccount.id)
      .following.list({
        limit: 80,
      });

    console.log("Following paginator:", followingPaginator);

    const { value: followingFirstPage } = await followingPaginator.next();
    console.log("Following first page:", followingFirstPage);

    // Check relationships with first accounts
    const ids = followingFirstPage?.map((account) => account.id);
    console.log("IDs:", ids);

    if (!ids) return;
    const relationships = await masto.v1.accounts.relationships.fetch({
      id: ids,
    });
    console.log("Relationships:", relationships);

    // Find first account that follows = false
    const notFollowing = relationships.filter(
      (account) => !account.followedBy,
    );
    usersNotFollowedBy.value = notFollowing;

    const details = await masto.v1.accounts.$select(notFollowing[0].id).fetch();
    console.log("Details:", details);

    currentDetails.value = details;
  };

  useSignalEffect(() => {
    if (!usersNotFollowedBy.value) return;

    const notFollowedBy = usersNotFollowedBy.value;
    console.log("Users not following you:", notFollowedBy);
  });

  const handleUnfollowButtonClick = async () => {
    if (!mastoClient.value) return;
    await mastoClient.value.v1.accounts.$select(
      currentDetails.value?.id,
    )
      .unfollow();
  };

  if (isAuthed.value) {
    return (
      <>
        <p>
          Authenticated as @{username.value}@{domain.value}
        </p>

        {currentDetails.value && (
          <>
            <div class="my-4">
              <p>
                Not followed by:{" "}
                <a href={currentDetails.value.url}>
                  @{currentDetails.value.acct}
                </a>
              </p>
              <p>
                {currentDetails.value.displayName}
              </p>
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(currentDetails.value.note),
                  }}
                />
              </p>
            </div>

            <div class="my-4">
              <button
                type="button"
                class="btn"
                onClick={handleUnfollowButtonClick}
              >
                Unfollow
              </button>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p>
        Please enter your fediverse address...
      </p>

      <div class="my-4">
        <form
          onSubmit={handleSubmit}
          class="flex gap-2"
        >
          <input
            type="text"
            placeholder="@user@domain.com"
            class=""
          />
          <button type="submit" class="btn">Continue</button>
        </form>
      </div>

      {authHref.value && (
        <>
          <div class="my-4">
            <a
              href={authHref.value}
              target="_blank"
              class=""
            >
              Authorize {"-->"}
            </a>
          </div>
          <div class="my-4">
            <form
              onSubmit={handleAuthSubmit}
              class="flex gap-2"
            >
              <input
                type="text"
                placeholder="<authorization_code>"
                class=""
              />
              <button type="submit" class="btn">Auth</button>
            </form>
          </div>
        </>
      )}

      {accessToken.value && (
        <div class="my-4">
          <p>
            Access token: {accessToken.value.access_token}
          </p>
        </div>
      )}
    </>
  );
};

export default Main;
