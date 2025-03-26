import type { Signal } from "@preact/signals";

import {
  computed,
  effect,
  signal,
  untracked,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";
import { parseMastodonUser } from "~/lib/parseMastodonUser.ts";

const Main = () => {
  const userInput = useSignal("");

  useSignalEffect(() => {});

  console.log("Main component rendered");

  // Handle form submission
  const handleSubmit = (event: Event) => {
    event.preventDefault();

    // Get the form and input element
    const form = event.target as HTMLFormElement;
    const inputValue = form.querySelector("input")?.value || "";

    // Parse the input value
    const parsed = parseMastodonUser(inputValue);

    console.log("Form submitted with value:", inputValue);
    console.log("Parsed data:", parsed);
  };

  return (
    <>
      <p>
        Please enter your fediverse address...
      </p>

      <div class="my-4">
        <form
          onSubmit={handleSubmit}
          class="flex gap-2"
        >
          <input
            type="text"
            value={userInput}
            onInput={(event) => userInput.value = event.currentTarget.value}
            placeholder="@user@domain.com"
            class=""
          />
          <button type="submit" class="btn">Continue</button>
        </form>
      </div>
    </>
  );
};

export default Main;
