import { Effect } from "effect";
import { REDIRECT_URI } from "~/lib/constants.ts";
import type { MastodonApplication } from "~/types/MastodonApplication.ts";

export const registerApplication = (
  domain: string,
): Effect.Effect<MastodonApplication, Error> => {
  return Effect.tryPromise({
    try: async () => {
      // Create URL from the domain string
      const url = new URL(`https://${domain}`);

      const response = await fetch(`${url.origin}/api/v1/apps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_name: "Ufollow for Mastodon",
          redirect_uris: REDIRECT_URI,
          scopes: "read write push",
          website: "https://ufollow.deno.dev",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return await response.json() as MastodonApplication;
    },
    catch: (error) =>
      new Error(error instanceof Error ? error.message : String(error)),
  });
};
