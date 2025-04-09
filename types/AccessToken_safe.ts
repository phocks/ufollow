import { z } from "zod";

export const AccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.enum(["Bearer"]),
  scope: z.string(),
  created_at: z.number(),
});

export type AccessToken = z.infer<typeof AccessTokenSchema>;
