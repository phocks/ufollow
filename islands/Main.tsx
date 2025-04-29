import { userInfoSignal } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal } from "~/signals/accessTokenSignal.ts";
import { effect } from "@preact/signals";

const Main = () => {
  console.log("Main component run...");

  effect(() => {
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
