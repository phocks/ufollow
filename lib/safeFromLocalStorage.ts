import type Result from "~/types/Result.ts";
import safeJsonParse, { safeJsonParseEffect } from "~/lib/safeJsonParse.ts";
import { Effect } from "effect";
import { z } from "zod";

/**
 * Generic function to retrieve and validate items from localStorage using Effect
 *
 * @param key - The localStorage key to retrieve
 * @param schema - Zod schema for validation
 * @returns An Effect that resolves to the validated value or fails with an error
 */
export function getFromLocalStorageEffect<T>(
  key: string,
  schema: z.ZodType<T>,
): Effect.Effect<T, Error> {
  return Effect.gen(function* () {
    // Check for localStorage availability
    if (typeof localStorage === "undefined") {
      yield* Effect.fail(new Error("localStorage is not available"));
    }

    // Try to get the item from localStorage
    const item = localStorage.getItem(key);
    if (item === null) {
      return yield* Effect.fail(
        new Error(`Item not found in localStorage for key: ${key}`),
      );
    }

    // Parse JSON - directly yield* the Effect
    const parsed = yield* safeJsonParseEffect(item);

    // Validate with Zod schema
    const validationResult = schema.safeParse(parsed);
    if (!validationResult.success) {
      yield* Effect.fail(
        new Error(
          `Validation failed for localStorage key ${key}: ${validationResult.error.message}`,
        ),
      );
    }

    return validationResult.data as T;
  });
}

/**
 * Generic function to retrieve and validate items from localStorage
 */
function getFromLocalStorage<T>(
  key: string,
  schema: z.ZodType<T>,
): Result<T> {
  const item = localStorage.getItem(key);
  if (!item) {
    return {
      ok: false,
      error: new Error(`Item not found in localStorage for key: ${key}`),
    };
  }

  // Parse JSON and return early if parsing fails
  const jsonResult = safeJsonParse(item);
  if (!jsonResult.ok) {
    return { ok: false, error: jsonResult.error };
  }

  // Validate with provided schema
  const validationResult = schema.safeParse(jsonResult.value);
  if (validationResult.success) {
    return { ok: true, value: validationResult.data };
  } else {
    return { ok: false, error: validationResult.error };
  }
}

export default getFromLocalStorage;
