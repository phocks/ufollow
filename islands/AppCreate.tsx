import { untracked, useSignalEffect } from "@preact/signals";
import parseMastodonUser from "~/lib/parseMastodonUser.ts";
import { registerApplication } from "~/lib/registerApplication.ts";
import applicationFromLocalStorage from "~/lib/applicationFromLocalStorage.ts";
import { match } from "ts-pattern";
import { Effect } from "effect";

const init = (domain: string) => {
  console.log("AppCreate component mounted...");

  // Check if the application is already in local storage
  const appInLocalStorage = applicationFromLocalStorage(domain);
  if (appInLocalStorage.ok) {
    console.log("Application found in local storage. Nothing to do.");
    return;
  }

  // If not, register a new application
  Effect.runPromise(
    Effect.match(registerApplication(domain), {
      onSuccess: (application) => {
        console.log("Registered application:", application);
        localStorage.setItem(
          `application:${domain}`,
          JSON.stringify(application),
        );
        globalThis.location.href = "/";
        return application;
      },
      onFailure: (error) => {
        console.error("Registration failed:", error);
      },
    }),
  );
};

interface AppCreateProps {
  domain: string;
}

const AppCreate = ({ domain }: AppCreateProps) => {
  useSignalEffect(() => untracked(() => init(domain)));
  return <div class="app-create"></div>;
};

export default AppCreate;
