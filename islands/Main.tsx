import { userInfoSignal } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal } from "~/signals/accessTokenSignal.ts";
import { useSignalEffect } from "@preact/signals";

const Main = () => {
  useSignalEffect(() => {
    console.log("userInfoSignal", userInfoSignal.value);
    console.log("mastodonApplicationSignal", mastodonApplicationSignal.value);
    console.log("accessTokenSignal", accessTokenSignal.value);
  });

  return (
    <>
      <div></div>
    </>
  );
};

export default Main;
