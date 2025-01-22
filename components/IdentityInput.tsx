import { useSignal } from "@preact/signals";
import { domain, username } from "../signals/auth.ts";

const IdentityInput = () => {
  const usernameLocal = useSignal("");
  const domainLocal = useSignal("");

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    console.log("submitting", usernameLocal.value, domainLocal.value);

    username.value = usernameLocal.value;
    domain.value = domainLocal.value;
  };

  return (
    <form onSubmit={handleSubmit} class="flex gap-2 items-center">
      <span class="text-gray-500">@</span>
      <input
        type="text"
        value={usernameLocal.value}
        onInput={(e) =>
          usernameLocal.value = (e.target as HTMLInputElement).value}
        placeholder="username"
        class="px-2 py-1 border rounded w-28"
      />
      <span class="text-gray-500">@</span>
      <input
        type="text"
        value={domainLocal.value}
        onInput={(e) =>
          domainLocal.value = (e.target as HTMLInputElement).value}
        placeholder="mastodon.social"
        class="px-2 py-1 border rounded w-42"
      />
      <button
        type="submit"
        class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go!
      </button>
    </form>
  );
};

export default IdentityInput;
