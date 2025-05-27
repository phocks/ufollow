import { REDIRECT_URI } from "./constants.ts";

/**
 * Generates the authorization URL for the OAuth2 flow.
 *
 * @param domain
 * @param clientId
 * @returns A string representing the authorization URL for the OAuth2 flow.
 */
export const buildAuthorizationUrl = (
  domain: string,
  clientId: string,
): string => {
  const params = new URLSearchParams({
    client_id: clientId,
    scopes: "read:follows write:follows",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
  });

  const baseUrl = new URL(`https://${domain}/`);

  return `${baseUrl.origin}/oauth/authorize?${params}`;
};

export default buildAuthorizationUrl;
