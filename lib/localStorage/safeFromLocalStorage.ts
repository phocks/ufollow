import { err, ok, Result } from "neverthrow";
import safeJsonParse, { safeJsonParseEffect } from "~/lib/safeJsonParse.ts";
import { z } from "zod";

/**
 * Generic function to retrieve and validate items from localStorage
 */
function getFromLocalStorage<T>(
  key: string,
  schema: z.ZodType<T>,
): Result<T, Error> {
  const item = localStorage.getItem(key);
  if (!item) {
    return err(new Error(`Item not found in localStorage for key: ${key}`));
  }

  // Parse JSON and return early if parsing fails
  const jsonResult = safeJsonParse(item);
  if (!jsonResult.ok) {
    return err(new Error(`JSON parse error: ${jsonResult.error}`));
  }

  // Validate with provided schema
  const validationResult = schema.safeParse(jsonResult.value);
  if (validationResult.success) {
    return ok(validationResult.data);
  } else {
    return err(
      new Error(`Validation error: ${validationResult.error.message}`),
    );
  }
}

export default getFromLocalStorage;
