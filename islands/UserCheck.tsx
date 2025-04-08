import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/userInfoFromLocalStorage.ts";
import { match } from "ts-pattern";
import { fold } from "~/types/Result.ts";

const init = () => {
  console.log("UserCheck component mounted...");
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
};

const UserCheck = () => {
  useSignalEffect(() => untracked(() => init()));
  return <div class="init"></div>;
};

export default UserCheck;
