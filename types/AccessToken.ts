import { z } from "zod";

const x = {
  "access_token": "F0VVy8C-G_Vlbtpne_HCrGwYDt-h0fFyTt3vgocP4Zs",
  "token_type": "Bearer",
  "scope": "read write push",
  "created_at": 1743065511,
};

export const AccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.enum(["Bearer"]),
  scope: z.string(),
  created_at: z.number(),
});

export type AccessToken = z.infer<typeof AccessTokenSchema>;
