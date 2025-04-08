import { z } from "zod";
import { type User } from "~/types/User.ts";
import { type Result } from "~/types/Result.ts";

// Define a schema for Mastodon user IDs
const mastodonUserSchema = z.string()
  .refine(
    (val) => /^@?[a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
    {
      message:
        "Invalid Mastodon user format. Expected format: @username@domain.tld",
    },
  )
  .transform((val) => {
    // Remove leading @ if present
    const userInput = val.startsWith("@") ? val.substring(1) : val;

    // Split into username and domain
    const [username, domain] = userInput.split("@");

    return { username, domain };
  });

/**
 * Parses a Mastodon user ID into username and domain components
 *
 * @param userInput - Mastodon user ID in format @username@domain.tld or username@domain.tld
 * @returns Result containing parsed user info or error
 */
export function parseMastodonUser(userInput: string): Result<User> {
  // Trim whitespace
  const trimmedInput = userInput.trim();

  // Parse with our schema
  const parsed = mastodonUserSchema.safeParse(trimmedInput);

  if (!parsed.success) {
    return {
      ok: false,
      error: new Error(`Invalid Mastodon user format: ${parsed.error.message}`),
    };
  }

  // Create the user object on success
  const user: User = {
    username: parsed.data.username,
    domain: parsed.data.domain,
    originalInput: trimmedInput,
    formattedUser: `@${parsed.data.username}@${parsed.data.domain}`, // Normalized format
  };

  return { ok: true, value: user };
}

export default parseMastodonUser;
