import { type Application, ApplicationSchema } from "~/types/Application.ts";
import type Result from "~/types/Result.ts";
import safeJsonParse from "~/lib/safeJsonParse.ts";

const applicationFromLocalStorage = (url: string): Result<Application> => {
  const app = localStorage.getItem(`application:${url}`);
  if (!app) {
    return { ok: false, error: new Error(`Application not found for ${url}`) };
  }

  // Parse JSON and return early if parsing fails
  const jsonResult = safeJsonParse(app);
  if (!jsonResult.ok) {
    return { ok: false, error: jsonResult.error };
  }

  const validationResult = ApplicationSchema.safeParse(jsonResult.value);

  // Convert Zod result to our Result type
  if (validationResult.success) {
    return { ok: true, value: validationResult.data };
  } else {
    return { ok: false, error: validationResult.error };
  }
};

export default applicationFromLocalStorage;
