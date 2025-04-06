import { type User, UserSchema } from "~/types/User.ts";
import type Result from "~/types/Result.ts";
import safeJsonParse from "~/lib/safeJsonParse.ts";

const userInfoFromLocalStorage = (): Result<User> => {
  const userInfo = localStorage.getItem("user-info");
  if (!userInfo) {
    return {
      ok: false,
      error: new Error("User info not found in localStorage"),
    };
  }

  // Parse JSON and return early if parsing fails
  const jsonResult = safeJsonParse(userInfo);
  if (!jsonResult.ok) {
    return { ok: false, error: jsonResult.error };
  }

  const validationResult = UserSchema.safeParse(jsonResult.value);

  // Convert Zod result to our Result type
  if (validationResult.success) {
    return { ok: true, value: validationResult.data };
  } else {
    return { ok: false, error: validationResult.error };
  }
};

export default userInfoFromLocalStorage;
