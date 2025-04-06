import { type User, UserSchema } from "~/types/User.ts";
import type Result from "~/types/Result.ts";
import getFromLocalStorage from "~/lib/safeFromLocalStorage.ts";

const userInfoFromLocalStorage = (): Result<User> => {
  return getFromLocalStorage("user-info", UserSchema);
};

export default userInfoFromLocalStorage;