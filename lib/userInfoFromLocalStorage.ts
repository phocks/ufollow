import { type User, UserSchema } from "~/types/User.ts";
import type Result from "~/types/Result.ts";
import safeFromLocalStorage from "~/lib/safeFromLocalStorage.ts";

const userInfoFromLocalStorage = (): Result<User> => {
  return safeFromLocalStorage("user-info", UserSchema);
};

export default userInfoFromLocalStorage;
