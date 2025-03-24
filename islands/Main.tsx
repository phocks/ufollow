import {
  computed,
  effect,
  signal,
  untracked,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";

const Main = () => {
  const userInput = useSignal("");
  const username = useSignal("");
  const domain = useSignal("");

  useSignalEffect(() => {
    console.log(userInput.value);
  });

  return (
    <>
      <input
        type="text"
        value={userInput}
        onInput={(event) => userInput.value = event.currentTarget.value}
        placeholder="@user@domain.com"
        class=""
      />

      <button type="button" class="btn btn-blue">Lock in</button>
    </>
  );
};

export default Main;
