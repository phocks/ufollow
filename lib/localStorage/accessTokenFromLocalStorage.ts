import { type AccessToken, AccessTokenSchema } from "~/types/AccessToken.ts";
import { err, ok, Result } from "neverthrow";
import safeFromLocalStorage from "./safeFromLocalStorage.ts";

const accessTokenFromLocalStorage = (handle: string) => {
  return safeFromLocalStorage(`access-token:${handle}`, AccessTokenSchema);
};

export default accessTokenFromLocalStorage;
