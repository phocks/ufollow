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

  return (
    <>
      <p class="libre-baskerville-regular">
        Please enter your fediverse address...
      </p>

      <div class="my-4">
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

          <button type="submit" class="btn btn-blue">Continue</button>
        </form>
      </div>

      {(username.value && domain.value) &&
        (
          <p class="libre-baskerville-regular">
            Your username is {username.value} and your domain is {domain.value}.
          </p>
        )}
    </>
  );
};

export default Main;
