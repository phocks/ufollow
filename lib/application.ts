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

interface Token {
  access_token: string;
  created_at: number;
  scope: string;
  token_type: string;
}

export const getClientToken = async (
  { baseUrl, clientId, clientSecret }: {
    baseUrl: string;
    clientId: string;
    clientSecret: string;
  },
): Promise<Token> => {
  const token = await fetch(baseUrl + "/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: "client_credentials",
    }),
  }).then((res) => res.json());

  return token;
};

// curl \
// 	-H 'Authorization: Bearer <access_token>' \
// 	https://mastodon.example/api/v1/apps/verify_credentials

export const verifyCredentials = async (baseUrl: string, token: string) => {
  const application = await fetch(baseUrl + "/api/v1/apps/verify_credentials", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => res.json());

  return application;
};

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

export const accountLookup = async (
  baseUrl: string,
  username: string,
): Promise<any> => {
  const params = new URLSearchParams({
    acct: username,
  });

  const response = await fetch(
    `${baseUrl}/api/v1/accounts/lookup?${params}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getAccountFollowing = async (
  baseUrl: string,
  accountId: string,
  accessToken: string,
): Promise<any> => {
  const params = new URLSearchParams({
    limit: "80",
  });

  const response = await fetch(
    `${baseUrl}/api/v1/accounts/${accountId}/following?${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Link: `<${baseUrl}/api/v1/accounts/${accountId}/following?${params}>; rel="next"`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

interface PaginationParams {
  limit?: number;
  max_id?: string;
  since_id?: string;
  min_id?: string;
}

export const getAllFollowing = async (
  baseUrl: string,
  accountId: string,
  accessToken: string
): Promise<any[]> => {
  let allFollowing: any[] = [];
  let nextUrl: string | null = `${baseUrl}/api/v1/accounts/${accountId}/following`;

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get accounts from current page
    const accounts: any[] = await response.json();
    allFollowing = [...allFollowing, ...accounts];

    // Parse Link header for next page
    const linkHeader = response.headers.get("Link");
    nextUrl = null;

    if (linkHeader) {
      const links = linkHeader.split(", ");
      for (const link of links) {
        if (link.includes('rel="next"')) {
          nextUrl = link.match(/<(.+)>/)?.[1] || null;
          break;
        }
      }
    }
  }

  return allFollowing;
};