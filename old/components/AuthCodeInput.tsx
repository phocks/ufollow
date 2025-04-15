import { REDIRECT_URI } from "~/lib/constants.ts";
import { accessToken, application, domain } from "../signals/auth.ts";

export interface AccessTokenResponse {
  access_token: string;
  token_type: "Bearer";
  scope: string;
  created_at: number;
}

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
): Promise<AccessTokenResponse> => {
  const params = buildAccessTokenRequestData(client_id, client_secret, code);

  const response = await fetch(`https://${domain}/oauth/token`, {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error(`Error obtaining access token: ${response.statusText}`);
  }

  return await response.json();
};

const IdentityInput = () => {
  const onSubmit = async (e: Event) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const authCode = form.auth.value;
    console.log("Auth code:", authCode);

    if (!application.value) {
      console.log("Application not set");
      return;
    }

    const token = await getAccessToken(
      domain.value,
      application.value.client_id,
      application.value.client_secret,
      authCode,
    );

    accessToken.value = token;
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
