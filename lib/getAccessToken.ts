import type { AccessToken } from "~/types/AccessToken.ts";
import { REDIRECT_URI } from "~/lib/constants.ts";

export const getAccessToken = async (
  { baseUrl, clientId, clientSecret, code }: {
    baseUrl: string;
    clientId: string;
    clientSecret: string;
    code: string;
  },
): Promise<AccessToken> => {
  const token = await fetch(baseUrl + "/oauth/token", {
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
  return token;
};
