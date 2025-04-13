import { Effect, Option } from "effect";
import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage, {
  userInfoFromLocalStorageEffect,
} from "../lib/localStorage/userInfoFromLocalStorage.ts";
import applicationFromLocalStorage from "../lib/localStorage/applicationFromLocalStorage.ts";
import accessTokenFromLocalStorage from "../lib/localStorage/accessTokenFromLocalStorage.ts";
import { match } from "ts-pattern";
import userInfoSignal from "~/signals/userInfo.ts";

const init = () => {
  console.log("UserCheck component mounted...");

  console.log("user info signal", userInfoSignal.value);

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

  // Try an Effect to get user info from localStorage
  const result = Effect.runSyncExit(
    userInfoFromLocalStorageEffect(),
  );

  const program1 = Effect.match(result, {
    onFailure: (error) => `failure: ${error.message}`,
    onSuccess: (value) => value,
  });

  const x = Effect.runSync(program1);
  console.log("Effect result:", x);

  // Get the value - TypeScript knows this is safe after the check
  const validUser = userOption.value;

  // Check if Mastodon API "application" is available in localStorage
  const mastodonApp = applicationFromLocalStorage(validUser.domain);

  // Probably redundant step here testing Effect library
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

  // Check if access token is available in localStorage
  const accessToken = accessTokenFromLocalStorage(
    `${validUser.username}@${validUser.domain}`,
  );

  match(accessToken)
    .with({ ok: true }, ({ value }) => {
      console.log("Access Token:", value);
      // Proceed with the application logic
    })
    .with({ ok: false }, ({ error }) => {
      console.error("Error:", error);
      globalThis.location.href = "/authenticate";
    })
    .exhaustive();
};

const UserCheck = () => {
  useSignalEffect(() => untracked(() => init()));
  return <div class="user-check"></div>;
};

export default UserCheck;
