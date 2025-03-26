import type { Signal } from "@preact/signals";

import {
  batch,
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
  const username = useSignal<string | null>(null);
  const domain = useSignal<string | null>(null);

  const url = computed(() => {
    if (!username.value || !domain.value) {
      return null;
    }
    
    const baseUrl = `https://${domain.value}`;
    return new URL(baseUrl);
  });

  useSignalEffect(() => {
    console.log("Username changed:", username.value);
    console.log("Domain changed:", domain.value);
    console.log("URL changed:", url.value);

    return () => {
      console.log("Cleanup effect");
    };
  });

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    // Get the form and input element
    const form = event.target as HTMLFormElement;
    const inputValue = form.querySelector("input")?.value || "";

    // Parse the input value
    const parsed = parseMastodonUser(inputValue);

    console.log("Form submitted with value:", inputValue);
    console.log("Parsed data:", parsed);

    // Update the signals
    batch(() => {
      username.value = parsed?.username || "";
      domain.value = parsed?.domain || "";
    });
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
