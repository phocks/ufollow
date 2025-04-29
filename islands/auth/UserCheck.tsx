import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/localStorage/userInfoFromLocalStorage.ts";
import applicationFromLocalStorage from "~/lib/localStorage/applicationFromLocalStorage.ts";
import accessTokenFromLocalStorage from "~/lib/localStorage/accessTokenFromLocalStorage.ts";
import { userInfoSignal } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal } from "~/signals/accessTokenSignal.ts";

const init = () => {
  const userInfoResult = userInfoFromLocalStorage();

  if (userInfoResult.isErr()) {
    console.log("Not in local storage:", userInfoResult.error);
    globalThis.location.href = "/login";
    return;
  }

  const userInfo = userInfoResult.value;
  console.log("User Info:", userInfo);

  // Check if Mastodon API "application" is available in localStorage
  const mastodonAppResult = applicationFromLocalStorage(userInfo.domain);

  if (mastodonAppResult.isErr()) {
    console.log(
      "Error retrieving application info:",
      mastodonAppResult.error,
    );
    globalThis.location.href = `/create-app?domain=${userInfo.domain}`;
    return;
  }

  const mastodonApp = mastodonAppResult.value;
  console.log("Mastodon App:", mastodonApp);

  // Check if access token is available in localStorage
  const accessTokenResult = accessTokenFromLocalStorage(
    `${userInfo.username}@${userInfo.domain}`,
  );

  if (accessTokenResult.isErr()) {
    console.log("Error retrieving access token:", accessTokenResult.error);
    globalThis.location.href =
      `/auth?client-id=${mastodonApp.client_id}&domain=${userInfo.domain}`;
    return;
  }

  const accessToken = accessTokenResult.value;
  console.log("Access Token:", accessToken);

  // Set the signals with the retrieved values
  userInfoSignal.value = userInfo;
  mastodonApplicationSignal.value = mastodonApp;
  accessTokenSignal.value = accessToken;
};

const UserCheck = () => {
  console.log("UserCheck component...");
  useSignalEffect(() => untracked(() => init()));
  return <div class="user-check"></div>;
};

export default UserCheck;
