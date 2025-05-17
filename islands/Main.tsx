import { userInfoSignal as user } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal as app } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal as token } from "~/signals/accessTokenSignal.ts";
import { untracked, useSignalEffect } from "@preact/signals";
import { createRestAPIClient } from "masto";

const Main = () => {
  async function fetchFollowing() {
    console.log("userInfoSignal", user.value);
    console.log("mastodonApplicationSignal", app.value);
    console.log("accessTokenSignal", token.value);

    if (!user.value || !app.value || !token.value) return;

    const url = new URL(`https://${user.value.domain}`);

    console.log(url);

    const masto = createRestAPIClient({
      url: url.origin,
      accessToken: token.value?.access_token,
    });

    console.log("Masto client created:", masto);

    const userAccount = await masto.v1.accounts.verifyCredentials();
    console.log("Result:", userAccount);

    // Get accounts the user is following
    const followingPaginator = masto.v1.accounts.$select(userAccount.id)
      .following.list({
        limit: 80,
      });

    console.log("Following paginator:", followingPaginator);
  }

  useSignalEffect(() => {
    untracked(() => {
      fetchFollowing();
    });
  });

  if (!user.value || !app.value || !token.value) {
    return <div>User, app, or token not found</div>;
  }

  return (
    <>
      <div></div>
    </>
  );
};

export default Main;
