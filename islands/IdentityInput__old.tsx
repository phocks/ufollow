import { effect, useSignal } from "@preact/signals";

export default function IdentityInput() {
  const username = useSignal("");
  const domain = useSignal("");
  const isStored = useSignal(false);

  effect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedDomain = localStorage.getItem("domain");
    if (storedUsername && storedDomain) {
      isStored.value = true;
    }
  });

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    localStorage.setItem("username", username.value);
    localStorage.setItem("domain", domain.value);

    username.value = "";
    domain.value = "";
    isStored.value = true;
  };

  const handleClear = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("domain");
    isStored.value = false;
  };

  return (
    <div>
      {isStored.value
        ? (
          <div class="my-2">
            <p class="flex items-center">
              <span class="text-gray-500">@</span>
              <span>{localStorage.getItem("username")}</span>
              <span class="text-gray-500">@</span>
              <span>{localStorage.getItem("domain")}</span>
            </p>

            <button
              onClick={handleClear}
              class="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Stored Identity
            </button>
          </div>
        )
        : (
          <>
            <form onSubmit={handleSubmit} class="flex gap-2 items-center">
              <span class="text-gray-500">@</span>
              <input
                type="text"
                value={username}
                onInput={(e) =>
                  username.value = (e.target as HTMLInputElement).value}
                placeholder="username"
                class="px-2 py-1 border rounded w-28"
              />
              <span class="text-gray-500">@</span>
              <input
                type="text"
                value={domain}
                onInput={(e) =>
                  domain.value = (e.target as HTMLInputElement).value}
                placeholder="mastodon.social"
                class="px-2 py-1 border rounded w-42"
              />
              <button
                type="submit"
                class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
    </div>
  );
}
