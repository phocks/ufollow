import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/localStorage/userInfoFromLocalStorage.ts";
import applicationFromLocalStorage from "~/lib/localStorage/applicationFromLocalStorage.ts";
import accessTokenFromLocalStorage from "~/lib/localStorage/accessTokenFromLocalStorage.ts";
import { userInfoSignal } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal } from "~/signals/accessTokenSignal.ts";
import { redirectBrowserTo } from "../../lib/redirectBrowserTo.ts";

const init = () => {
  const userInfoResult = userInfoFromLocalStorage();

  if (userInfoResult.isErr()) {
    redirectBrowserTo("/login");
    return;
  }

  const userInfo = userInfoResult.value;

  // Check if Mastodon API "application" is available in localStorage
  const mastodonAppResult = applicationFromLocalStorage(userInfo.domain);

  if (mastodonAppResult.isErr()) {
    redirectBrowserTo(`/create-app?domain=${userInfo.domain}`);
    return;
  }

  const mastodonApp = mastodonAppResult.value;

  // Check if access token is available in localStorage
  const accessTokenResult = accessTokenFromLocalStorage(
    `${userInfo.username}@${userInfo.domain}`,
  );

  if (accessTokenResult.isErr()) {
    redirectBrowserTo(
      `/auth?client-id=${mastodonApp.client_id}&domain=${userInfo.domain}`,
    );
    return;
  }

  const accessToken = accessTokenResult.value;

  // Set the signals with the retrieved values
  userInfoSignal.value = userInfo;
  mastodonApplicationSignal.value = mastodonApp;
  accessTokenSignal.value = accessToken;
};

const UserCheck = () => {
  useSignalEffect(() => untracked(() => init()));
  return <div class="user-check"></div>;
};

export default UserCheck;
