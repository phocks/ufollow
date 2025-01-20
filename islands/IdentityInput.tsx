import { useEffect, useState } from "preact/hooks";

export default function IdentityInput() {
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");
  const [isStored, setIsStored] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedDomain = localStorage.getItem("domain");
    if (storedUsername && storedDomain) {
      setIsStored(true);
    }
  }, []);

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("domain", domain);
    setUsername("");
    setDomain("");
    setIsStored(true);
  };

  const handleClear = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("domain");
    setIsStored(false);
  };

  if (isStored) {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit} class="flex gap-2 items-center">
      <span class="text-gray-500">@</span>
      <input
        type="text"
        value={username}
        onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
        placeholder="username"
        class="px-2 py-1 border rounded w-28"
      />
      <span class="text-gray-500">@</span>
      <input
        type="text"
        value={domain}
        onInput={(e) => setDomain((e.target as HTMLInputElement).value)}
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
  );
}
