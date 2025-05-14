import { userInfoSignal as user } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal as app } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal as token } from "~/signals/accessTokenSignal.ts";
import { useSignalEffect } from "@preact/signals";
import { createRestAPIClient } from "masto";

const Main = () => {
  useSignalEffect(() => {
    console.log("userInfoSignal", user.value);
    console.log("mastodonApplicationSignal", app.value);
    console.log("accessTokenSignal", token.value);

    // const masto = createRestAPIClient({
    //   url: userInfoSignal.value?.domain,
    //   accessToken: accessTokenSignal.value?.access_token,
    // });

    // const status = await masto.v1.statuses.create({
    //   status: "Hello from #mastojs!",
    // });

    // console.log(status.url);
  });

  return (
    <>
      <div></div>
    </>
  );
};

export default Main;
