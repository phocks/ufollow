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

  username.value = "John Doe";
  domain.value = "example.com";

  setTimeout(() => {
    username.value = "Jane Doe";
  }, 1000);

  return (
    <input
      type="input"
      // value={userInput.value}
      onInput={(e) => userInput.value = e.currentTarget.value}
      placeholder="@user@domain.com"
    />
  );
};

export default Main;
