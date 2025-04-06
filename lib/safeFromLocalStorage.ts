import type Result from "~/types/Result.ts";
import safeJsonParse from "~/lib/safeJsonParse.ts";
import { z } from "zod";

/**
 * Generic function to retrieve and validate items from localStorage
 */
function getFromLocalStorage<T>(
  key: string, 
  schema: z.ZodType<T>
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