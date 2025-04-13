import { Effect } from "effect";

import { type User, UserSchema } from "~/types/User.ts";
import type Result from "~/types/Result.ts";
import safeFromLocalStorage, {
  getFromLocalStorageEffect,
} from "./safeFromLocalStorage.ts";

const userInfoFromLocalStorage = (): Result<User> => {
  return safeFromLocalStorage("user-info", UserSchema);
};

export const userInfoFromLocalStorageEffect = (): Effect.Effect<
  User,
  Error
> => {
  return getFromLocalStorageEffect("user-info", UserSchema);
};

export default userInfoFromLocalStorage;
