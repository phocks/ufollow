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

  useSignalEffect(() => {
    console.log("input:", userInput.value);
    console.log("username:", username.value);
    console.log("domain:", domain.value);
  });

  return (
    <>
      <p class="libre-baskerville-regular">
        Please enter your fediverse address...
      </p>

      <input
        type="text"
        value={userInput}
        onInput={(event) => userInput.value = event.currentTarget.value}
        placeholder="@user@domain.com"
        class=""
      />

      <button type="button" class="btn btn-blue">Continue</button>
    </>
  );
};

export default Main;
