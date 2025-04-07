import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/userInfoFromLocalStorage.ts";
import { match } from "ts-pattern";

const init = () => {
  console.log("UserLogin component mounted...");
};

interface UserLoginProps {
  handle: string;
}

const UserLogin = ({ handle }: UserLoginProps) => {
  console.log(handle);
  useSignalEffect(() => untracked(() => init()));
  return <div class="user-login"></div>;
};

export default UserLogin;
