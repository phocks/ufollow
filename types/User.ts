import * as v from "valibot";
import { z } from "zod";

export const UserSchema = v.object({
  username: v.string(),
  domain: v.string(),
  originalInput: v.string(),
  formattedUser: v.string(),
});

export const UserSchemaZod = z.object({
  username: z.string(),
  domain: z.string(),
  originalInput: z.string(),
  formattedUser: z.string(),
});

export type UserValibot = v.InferInput<typeof UserSchema>;
export type User = z.infer<typeof UserSchemaZod>;
