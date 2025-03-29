import type { Signal } from "@preact/signals";
import type { Application } from "~/lib/application.ts";
import { match, P } from "ts-pattern";
import { createRestAPIClient } from "masto";

type AuthState =
  | { status: "idle" }
  | { status: "loading_user_input" }
  | { status: "awaiting_authorization"; username: string; domain: string }
  | { status: "authorizing_code" }
  | { status: "authenticated"; username: string; avatarUrl: string }
  | { status: "error"; message: string };

import {
  accountLookup,
  buildAuthorizationUrl,
  getAccessToken,
  getAccountFollowing,
  getAllFollowing,
  getClientToken,
  registerApplication,
  verifyCredentials,
} from "~/lib/application.ts";

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
import { parseMastodonUser } from "~/lib/parseMastodonUser.ts";

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

  // Initialisation
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
    accessTokenAction();
  });

  const accessTokenAction = async () => {
    const masto = createRestAPIClient({
      url: url.value?.origin || "",
      accessToken: accessToken.value?.access_token || "",
    });

    console.log("Masto client created:", masto);

    const userAccount = await masto.v1.accounts.verifyCredentials();
    console.log("Result:", userAccount);

    // Get accounts the user is following
    const followingPaginator = masto.v1.accounts.$select(userAccount.id).following.list({
      limit: 80,
    });

    console.log("Following paginator:", await followingPaginator);





    // console.log("Following:", await following.next());
    // console.log("Following:", await following.next());

    // try {
    //   const allFollowing = [];
      
    //   // Process page by page with for-await-of
    //   for await (const accounts of followingPaginator) {
    //     console.log(`Got page with ${accounts.length} accounts`);
    //     allFollowing.push(...accounts);
    //   }
      
    //   console.log(`You follow ${allFollowing.length} accounts in total`);
      
    // } catch (error) {
    //   console.error("Error fetching following:", error);
    // }

    // const relationships = await masto.v1.accounts.relationships.fetch({
    //   id: ["112936018616709003"],
    // });
    // console.log("Relationships:", relationships);
  };

  if (isAuthed.value) {
    return (
      <>
        <p>
          You are now authenticated!
        </p>
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
