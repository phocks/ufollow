import type { Signal } from "@preact/signals";
import type { Application } from "~/lib/application.ts";
import { match, P } from "ts-pattern";

import {
  accountLookup,
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

const Main = () => {
  const username = useSignal<string | null>(null);
  const domain = useSignal<string | null>(null);
  const application = useSignal<Application | null>(null);

  const url = computed(() => {
    if (!username.value || !domain.value) {
      return null;
    }

    const baseUrl = `https://${domain.value}`;
    return new URL(baseUrl);
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

    // Update the signals
    batch(() => {
      username.value = parsed?.username || "";
      domain.value = parsed?.domain || "";
    });
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
    console.log("Application", application.value);
  });

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

      {url.value && (
        <div class="mt-4">
        </div>
      )}
    </>
  );
};

export default Main;
