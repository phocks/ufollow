import { REDIRECT_URI } from "../lib/constants.ts";
import { application, domain } from "../signals/auth.ts";

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
  const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log({ e });
    const form = e.target as HTMLFormElement;
    const authCode = form.auth.value;
    console.log("Auth code:", authCode);

    if (!application.value) return;

    const token = getAccessToken(
      domain.value,
      application.value.client_id,
      application.value.client_secret,
      authCode,
    );

    console.log("Access token:", token);
  };

  return (
    <div class="my-4">
      <form onSubmit={onSubmit} class="flex flex-col gap-2">
        <label class="block text-gray-700 text-sm" for="auth">
          Auth code (from login page)
        </label>
        <div class="flex gap-2">
          <input
            type="text"
            id="auth"
            name="auth"
            value=""
            placeholder="xxxxxxxx"
            class="px-2 py-1 border rounded w-64"
          />
          <button
            type="submit"
            class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get access token
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdentityInput;
