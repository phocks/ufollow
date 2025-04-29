import { userInfoSignal } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal } from "~/signals/mastodonApplicationSignal.ts";
import { effect } from "@preact/signals";

const Main = () => {
  console.log("Main component run...");

  effect(() => {
    console.log("userInfoSignal", userInfoSignal.value);
  });

  return (
    <>
      <div></div>
    </>
  );
};

export default Main;
