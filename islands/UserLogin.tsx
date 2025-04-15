import { untracked, useSignalEffect } from "@preact/signals";
import parseMastodonUser from "~/lib/parseMastodonUser.ts";
import { match } from "ts-pattern";

const init = (handle: string) => {
  console.log("UserLogin component mounted...");
  const mastodonUser = parseMastodonUser(handle);
  console.log("Parsed Mastodon User:", mastodonUser);

  match(mastodonUser)
    .with({ ok: true }, ({ value }) => {
      console.log("Mastodon user parsed successfully:", value);
      localStorage.setItem("user-info", JSON.stringify(value));

      // Redirect to the home page
      globalThis.location.href = "/";
    })
    .with({ ok: false }, ({ error }) => {
      console.log("Failed to parse Mastodon user:", mastodonUser);
    })
    .exhaustive();
};

interface UserLoginProps {
  handle: string;
}

const UserLogin = ({ handle }: UserLoginProps) => {
  useSignalEffect(() => untracked(() => init(handle)));
  return <div class="user-login"></div>;
};

export default UserLogin;
