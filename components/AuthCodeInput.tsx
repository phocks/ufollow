import { REDIRECT_URI } from "../lib/constants.ts";
import { authCode } from "../signals/auth.ts";
import { useSignal } from "@preact/signals";

const buildAccessTokenRequestData = (
  client_id: string,
  client_secret: string,
  code: string,
): URLSearchParams => {
  return new URLSearchParams({
    client_id,
    client_secret,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
    code,
    scope: "read write push",
  });
};

const getAccessToken = async (
  domain: string,
  client_id: string,
  client_secret: string,
  code: string,
): Promise<string> => {
  const params = buildAccessTokenRequestData(client_id, client_secret, code);

  const response = await fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(`Error obtaining access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
};

const IdentityInput = () => {
  const inputText = useSignal(authCode.value);

  const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log({ e });
    authCode.value = inputText.value;
  };

  return (
    <div class="my-4">
      <form onSubmit={onSubmit} class="flex flex-col gap-2">
        <label class="block text-gray-700 text-sm font-bold" for="auth">
          Auth code
        </label>
        <div class="flex gap-2">
          <input
            type="text"
            id="auth"
            name="auth"
            value={inputText.value}
            onInput={(e) =>
              inputText.value = (e.target as HTMLInputElement).value}
            placeholder="xxxxxxxx"
            class="px-2 py-1 border rounded w-64"
          />
          <button
            type="submit"
            class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdentityInput;
