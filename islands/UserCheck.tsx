import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/userInfoFromLocalStorage.ts";
import mastodonAppFromLocalStorage from "~/lib/applicationFromLocalStorage.ts";
import { match } from "ts-pattern";
import { Option } from "effect";

const init = () => {
  console.log("UserCheck component mounted...");

  // Check if user info is available in localStorage
  // If not, redirect to login page
  const userInfo = userInfoFromLocalStorage();

  const userOption = match(userInfo)
    .with({ ok: true }, ({ value }) => {
      console.log("User Info:", value);
      return Option.some(value);
    })
    .with({ ok: false }, ({ error }) => {
      console.error("Error:", error);
      return Option.none();
    })
    .exhaustive();

  if (Option.isNone(userOption)) {
    console.error("Invalid user info");
    globalThis.location.href = "/login";
    return;
  }

  // Get the value - TypeScript knows this is safe after the check
  const validUser = userOption.value;

  // Check if Mastodon API "application" is available in localStorage
  const mastodonApp = mastodonAppFromLocalStorage(validUser.domain);

  const appOption = match(mastodonApp)
    .with({ ok: true }, ({ value }) => {
      return Option.some(value);
    })
    .with({ ok: false }, ({ error }) => {
      console.error("Error:", error);
      return Option.none();
    })
    .exhaustive();

  Option.match(appOption, {
    onNone: () => {
      console.error("Invalid app info");
      globalThis.location.href = `/create-app?domain=${validUser.domain}`;
    },
    onSome: (validApp) => {
      console.log("Ready to use app:", validApp);
      // Continue with app initialization...
    },
  });
};

const UserCheck = () => {
  useSignalEffect(() => untracked(() => init()));
  return <div class="user-check"></div>;
};

export default UserCheck;
