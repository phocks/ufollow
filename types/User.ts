import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  domain: z.string(),
  originalInput: z.string(),
  formattedUser: z.string(),
});

export type User = z.infer<typeof UserSchema>;
