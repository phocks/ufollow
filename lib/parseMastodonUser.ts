import { z } from "zod";

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
 * @returns Object containing username and domain, or null if invalid
 */
export function parseMastodonUser(userInput: string): {
  username: string;
  domain: string;
  originalInput: string;
  formattedUser: string;
} | null {
  try {
    // Trim whitespace
    const trimmedInput = userInput.trim();

    // Parse with our schema
    const result = mastodonUserSchema.parse(trimmedInput);

    return {
      username: result.username,
      domain: result.domain,
      originalInput: trimmedInput,
      formattedUser: `@${result.username}@${result.domain}`, // Normalized format
    };
  } catch (error) {
    // If you want to see the error in the console
    // console.error("Failed to parse Mastodon user:", error);
    return null;
  }
}
