import { type User, UserSchemaZod } from "~/types/User.ts";
import { err, ok, Result } from "neverthrow";
import safeFromLocalStorage from "./safeFromLocalStorage.ts";

const userInfoFromLocalStorage = (): Result<User, Error> => {
  return safeFromLocalStorage("user-info", UserSchemaZod);
};

export default userInfoFromLocalStorage;
