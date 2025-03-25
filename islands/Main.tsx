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

  console.log("Main component rendered");

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("Form submitted");
        }}
      >
        <input
          type="text"
          value={userInput}
          onInput={(event) => userInput.value = event.currentTarget.value}
          placeholder="@user@domain.com"
          class=""
        />

        <button type="submit" class="btn btn-blue">Lock in</button>
      </form>
    </>
  );
};

export default Main;
