import { type AccessToken, AccessTokenSchema } from "~/types/AccessToken.ts";
import type Result from "~/types/Result.ts";
import safeFromLocalStorage from "~/lib/safeFromLocalStorage.ts";

const accessTokenFromLocalStorage = (handle: string): Result<AccessToken> => {
  return safeFromLocalStorage(`access-token:${handle}`, AccessTokenSchema);
};

export default accessTokenFromLocalStorage;
