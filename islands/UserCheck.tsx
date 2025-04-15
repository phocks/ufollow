import { err, ok, type Result } from "neverthrow";
import { type User } from "~/types/User.ts";
import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/localStorage/userInfoFromLocalStorage.ts";
import applicationFromLocalStorage from "~/lib/localStorage/applicationFromLocalStorage.ts";
import accessTokenFromLocalStorage from "~/lib/localStorage/accessTokenFromLocalStorage.ts";

const init = () => {
  // Check if user info is available in localStorage
  const result = userInfoFromLocalStorage();

  if (result.isErr()) {
    console.error("Error retrieving user info:", result.error);
    globalThis.location.href = "/login";
    return;
  }

  const userInfo = result.value;

  console.log("User Info:", userInfo);

  // Check if Mastodon API "application" is available in localStorage
  const mastodonApp = applicationFromLocalStorage(userInfo.domain);

  // // Probably redundant step here testing Effect library
  // const appOption = match(mastodonApp)
  //   .with({ ok: true }, ({ value }) => {
  //     return Option.some(value);
  //   })
  //   .with({ ok: false }, ({ error }) => {
  //     console.error("Error:", error);
  //     return Option.none();
  //   })
  //   .exhaustive();

  // Option.match(appOption, {
  //   onNone: () => {
  //     console.error("Invalid app info");
  //     globalThis.location.href = `/create-app?domain=${validUser.domain}`;
  //   },
  //   onSome: (validApp) => {
  //     console.log("Ready to use app:", validApp);
  //     // Continue with app initialization...
  //   },
  // });

  // // Check if access token is available in localStorage
  // const accessToken = accessTokenFromLocalStorage(
  //   `${validUser.username}@${validUser.domain}`,
  // );

  // match(accessToken)
  //   .with({ ok: true }, ({ value }) => {
  //     console.log("Access Token:", value);
  //     // Proceed with the application logic
  //   })
  //   .with({ ok: false }, ({ error }) => {
  //     console.error("Error:", error);
  //     globalThis.location.href = "/authenticate";
  //   })
  //   .exhaustive();
};

const UserCheck = () => {
  useSignalEffect(() => untracked(() => init()));
  return <div class="user-check"></div>;
};

export default UserCheck;
