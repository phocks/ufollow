import type { Signal } from "@preact/signals";
import type { Application } from "~/lib/application.ts";
import { match, P } from "ts-pattern";

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
    return !!accessToken.value;
  });

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    // Get the form and input element
    const form = event.target as HTMLFormElement;
    const inputValue = form.querySelector("input")?.value || "";

    // Parse the input value
    const parsed = parseMastodonUser(inputValue);

    console.log("Form submitted with value:", inputValue);
    console.log("Parsed data:", parsed);

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

    console.log("Access token:", token);
    accessToken.value = token;
  };

  useSignalEffect(() => {
    if (!url.value || !username.value) return;

    console.log("URL", url.value);

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

  useSignalEffect(() => {
    untracked(() => {
      // Check local storage for saved user data
      const userInfo = localStorage.getItem("user-info");

      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        console.log("Parsed user info from local storage:", parsed);

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
        console.log("Cached access token:", token);

        accessToken.value = token;
      }
    });
  });

  if (isAuthed) {
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
