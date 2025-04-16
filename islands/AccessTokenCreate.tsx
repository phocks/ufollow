import { untracked, useSignalEffect } from "@preact/signals";
import applicationFromLocalStorage from "../lib/localStorage/applicationFromLocalStorage.ts";
import accessTokenFromLocalStorage from "~/lib/localStorage/accessTokenFromLocalStorage.ts";
import { getAccessToken } from "../lib/getAccessToken.ts";
import userInfoFromLocalStorage from "~/lib/localStorage/userInfoFromLocalStorage.ts";

function redirectToHome() {
  globalThis.location.href = "/";
}

const init = (authCode: string, domain: string) => {
  console.log("AuthCodeCreate component mounted...");

  const acessTokenInLocalStorage = accessTokenFromLocalStorage(domain);

  if (acessTokenInLocalStorage.isOk()) {
    console.log("Access token found in local storage. Nothing to do.");
    return;
  }

  const userInfoResult = userInfoFromLocalStorage();

  if (userInfoResult.isErr()) {
    console.log("No user info found in local storage. Go home.");
    redirectToHome();
    return;
  }

  const userInfo = userInfoResult.value;

  const applicationResult = applicationFromLocalStorage(domain);

  if (applicationResult.isErr()) {
    console.log("No application found in local storage. Go home.");
    redirectToHome();
    return;
  }

  const application = applicationResult.value;

  console.log("Application found in local storage:", application);

  getAccessToken({
    domain: domain,
    clientId: application.client_id,
    clientSecret: application.client_secret,
    code: authCode,
  }).then((token) => {
    console.log("Access token received:", token);
    const storageKey = `access-token:${userInfo.username}@${domain}`;
    localStorage.setItem(storageKey, JSON.stringify(token));
    redirectToHome();
  }).catch((error) => {
    console.error("Error fetching access token:", error);
  });
};

interface Props {
  authCode: string;
  domain: string;
}

export default function AccessTokenCreate({ authCode, domain }: Props) {
  useSignalEffect(() => untracked(() => init(authCode, domain)));
  return <div class="auth-code-create"></div>;
}
