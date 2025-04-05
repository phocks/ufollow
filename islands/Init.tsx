import type Application from "~/types/Application.ts";
import type Result from "~/types/Result.ts";
import safeJsonParse from "~/lib/safeJsonParse.ts";

import { z } from "zod";
import { untracked, useSignalEffect } from "@preact/signals";

const ApplicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string(),
  scopes: z.array(z.string()),
  redirect_uris: z.array(z.string()),
  vapid_key: z.string(),
  redirect_uri: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
  client_secret_expires_at: z.number(),
});

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

const init = () => {
  console.log(applicationFromLocalStorage("masto.byrd.ws"));
};

const Init = () => {
  useSignalEffect(() => untracked(() => init()));

  return <div class="init"></div>;
};

export default Init;
