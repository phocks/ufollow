import { type UserData, UserSchemaZod } from "~/types/User.ts";
import { err, ok, Result } from "neverthrow";
import safeFromLocalStorage from "./safeFromLocalStorage.ts";

const userInfoFromLocalStorage = (): Result<UserData, Error> => {
  return safeFromLocalStorage("user-info", UserSchemaZod);
};

export default userInfoFromLocalStorage;
