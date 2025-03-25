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
import { useEffect } from "preact/hooks/src/index.d.ts";
import { parseMastodonUser } from "~/lib/parseMastodonUser.ts";

const UserInfo = ({
  username,
  domain,
}: {
  username: Signal<string | null>;
  domain: Signal<string | null>;
}) => {
  console.log("UserInfo component rendered");

  if (!username.value || !domain.value) {
    return <p>Please enter a valid username and domain.</p>;
  }

  return (
    <p>
      Your username is {username} and your domain is {domain}.
    </p>
  );
};

const Main = () => {
  const userInput = useSignal("");

  const username = useComputed(() => {
    const parsed = parseMastodonUser(userInput.value);
    if (!parsed) return null;
    return parsed.username;
  });

  const domain = useComputed(() => {
    const parsed = parseMastodonUser(userInput.value);
    if (!parsed) return null;
    return parsed.domain;
  });

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
        >
          <input
            type="text"
            value={userInput}
            onInput={(event) => userInput.value = event.currentTarget.value}
            placeholder="@user@domain.com"
            class=""
          />

          <button type="submit" class="btn btn-blue">Continue</button>
        </form>
      </div>

      <div class="my-4">
        <UserInfo username={username} domain={domain} />
      </div>
    </>
  );
};

export default Main;
