import { REDIRECT_URI } from "../lib/constants.ts";

export const registerApplication = async (baseUrl: string) => {
  // curl -X POST \
  // -F 'client_name=Test Application' \
  // -F 'redirect_uris=urn:ietf:wg:oauth:2.0:oob' \
  // -F 'scopes=read write push' \
  // -F 'website=https://myapp.example' \
  // https://mastodon.example/api/v1/apps

  const application = await fetch(baseUrl + "/api/v1/apps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_name: "Test Application",
      redirect_uris: REDIRECT_URI,
      scopes: "read write push",
      website: "https://myapp.example",
    }),
  }).then((res) => res.json());

  return application;
};

export const buildAuthorizationUrl = (baseUrl: string, client_id: string): string => {
  const params = new URLSearchParams({
    client_id,
    scope: "read write push",
    redirect_uri: REDIRECT_URI,
    response_type: "code"
  });
  return `${baseUrl}/oauth/authorize?${params}`;
};