import { untracked, useSignalEffect } from "@preact/signals";
import { registerApplication } from "~/lib/registerApplication.ts";
import applicationFromLocalStorage from "../lib/localStorage/applicationFromLocalStorage.ts";
import { buildAuthorizationUrl } from "~/lib/buildAuthorizationUrl.ts";

const init = (authCode: string) => {
  console.log("AuthCodeCreate component mounted...");

  // // Check if the application is already in local storage
  // const appInLocalStorage = applicationFromLocalStorage(domain);

  // if (appInLocalStorage.isOk()) {
  //   console.log("Application found in local storage. Nothing to do.");
  //   return;
  // }

  // // If not, register a new application
  // Effect.runPromise(
  //   Effect.match(registerApplication(domain), {
  //     onSuccess: (application) => {
  //       console.log("Registered application:", application);
  //       localStorage.setItem(
  //         `application:${domain}`,
  //         JSON.stringify(application),
  //       );
  //       globalThis.location.href = "/";
  //       return application;
  //     },
  //     onFailure: (error) => {
  //       console.log("Registration failed:", error);
  //     },
  //   }),
  // );
};

interface Props {
  authCode: string;
}

const AuthCodeCreate = ({ authCode }: Props) => {
  useSignalEffect(() => untracked(() => init(authCode)));
  return <div class="auth-code-create"></div>;
};

export default AuthCodeCreate;
