import type Result from "~/types/Result.ts";
import { Effect } from "effect";

/**
 * Safely parses JSON using Effect for error handling
 *
 * @param text - The JSON string to parse
 * @returns An Effect that resolves to the parsed JSON or fails with an error
 */
export const safeJsonParseEffect = (
  text: string,
): Effect.Effect<any, Error> => {
  return Effect.try({
    try: () => JSON.parse(text),
    catch: (e) => e instanceof Error ? e : new Error("JSON parse error"),
  });
};

// Helper function for safe JSON parsing
const safeJsonParse = (text: string): Result<any> => {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e : new Error("JSON parse error"),
    };
  }
};

export default safeJsonParse;
