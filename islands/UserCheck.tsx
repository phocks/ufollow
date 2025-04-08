import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/userInfoFromLocalStorage.ts";
import { match } from "ts-pattern";

const init = () => {
  console.log("UserCheck component mounted...");

  // Check if user info is available in localStorage
  // If not, redirect to login page
  const userInfo = userInfoFromLocalStorage();

  match(userInfo)
    .with({ ok: true }, ({ value }) => {
      console.log("User Info:", value);
    })
    .with({ ok: false }, ({ error }) => {
      console.error("Error:", error);
      globalThis.location.href = "/login";
    })
    .exhaustive();

  // Check if Mastodon API "application" is available in localStorage
  // const mastodonApp = mastodonAppFromLocalStorage();
};

const UserCheck = () => {
  useSignalEffect(() => untracked(() => init()));
  return <div class="init"></div>;
};

export default UserCheck;
