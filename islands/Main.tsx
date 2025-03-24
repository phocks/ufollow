import {
  computed,
  effect,
  signal,
  untracked,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";

import Input from "~/components/Input.tsx";

const Main = () => {
  const userInput = useSignal("");
  const username = useSignal("");
  const domain = useSignal("");

  useSignalEffect(() => {
    console.log(userInput.value);
  });

  return (
    <input
      type="text"
      value={userInput}
      onInput={(event) => userInput.value = event.currentTarget.value}
      placeholder="@user@domain.com"
      class=""
    />
  );
};

export default Main;
