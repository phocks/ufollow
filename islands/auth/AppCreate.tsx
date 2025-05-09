import { untracked, useSignalEffect } from "@preact/signals";
import { registerApplication } from "~/lib/registerApplication.ts";
import applicationFromLocalStorage from "~/lib/localStorage/applicationFromLocalStorage.ts";
import { Effect } from "effect";

function redirectToHome() {
  globalThis.location.href = "/";
}

const init = (domain: string) => {
  console.log("AppCreate component mounted...");

  // Check if the application is already in local storage
  const appInLocalStorage = applicationFromLocalStorage(domain);

  if (appInLocalStorage.isOk()) {
    console.log("Application found in local storage. Nothing to do.");
    redirectToHome();
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
        redirectToHome();
        return application;
      },
      onFailure: (error) => {
        console.log("Registration failed:", error);
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
