import { REDIRECT_URI } from "~/lib/constants.ts";

export const registerApplication = async (baseUrl: string) => {
  const application = await fetch(baseUrl + "/api/v1/apps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_name: "Ufollow for Mastodon",
      redirect_uris: REDIRECT_URI,
      scopes: "read write push",
      website: "https://ufollow.pp.ua",
    }),
  }).then((res) => res.json());

  return application;
};

export const buildTokenUrl = (baseUrl: string): string => {
  return `${baseUrl}/oauth/token`;
}

export const buildAuthorizationUrl = (
  baseUrl: string,
  client_id: string,
): string => {
  const params = new URLSearchParams({
    client_id,
    scope: "read write push",
    redirect_uri: REDIRECT_URI,
    response_type: "code",
  });
  return `${baseUrl}/oauth/authorize?${params}`;
};
