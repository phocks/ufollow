import type { AccessToken } from "~/types/AccessToken.ts";
import { REDIRECT_URI } from "~/lib/constants.ts";

export const getAccessToken = async (
  { domain, clientId, clientSecret, code }: {
    domain: string;
    clientId: string;
    clientSecret: string;
    code: string;
  },
): Promise<AccessToken> => {
  const baseUrl = new URL(`https://${domain}/`);

  const token = await fetch(`${baseUrl.origin}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
      code,
    }),
  }).then((res) => res.json());

  if (token.error) {
    throw new Error(token.error_description);
  }
  
  return token;
};
