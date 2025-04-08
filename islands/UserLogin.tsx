import { untracked, useSignalEffect } from "@preact/signals";
import parseMastodonUser from "~/lib/parseMastodonUser.ts";
import { match } from "ts-pattern";

const init = () => {
  console.log("UserLogin component mounted...");
};

interface UserLoginProps {
  handle: string;
}

const UserLogin = ({ handle }: UserLoginProps) => {
  const mastodonUser = parseMastodonUser(handle);
  console.log("Parsed Mastodon User:", mastodonUser);
  useSignalEffect(() => untracked(() => init()));
  return <div class="user-login"></div>;
};

export default UserLogin;
