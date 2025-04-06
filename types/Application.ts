import { z } from "zod";

export const ApplicationSchema = z.object({
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

export type Application = z.infer<typeof ApplicationSchema>;

