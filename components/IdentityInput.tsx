import { computed } from "@preact/signals";
import { z } from "zod";

import { domain, username } from "../signals/auth.ts";

const stringSchema = z.string();

const IdentityInput = () => {
  const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log(username.value, domain.value);
  };

  return (
    <form onSubmit={onSubmit} class="flex gap-2 items-center">
      <span class="text-gray-500">@</span>
      <input
        type="text"
        name="username"
        value={username.value}
        onInput={(e) => username.value = (e.target as HTMLInputElement).value}
        placeholder="username"
        class="px-2 py-1 border rounded w-28"
      />
      <span class="text-gray-500">@</span>
      <input
        type="text"
        name="domain"
        value={domain.value}
        onInput={(e) => domain.value = (e.target as HTMLInputElement).value}
        placeholder="mastodon.social"
        class="px-2 py-1 border rounded w-42"
      />
      <button
        type="submit"
        class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Validate
      </button>
    </form>
  );
};

export default IdentityInput;
