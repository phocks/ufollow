import { type Application, ApplicationSchema } from "~/types/Application.ts";
import type Result from "~/types/Result.ts";
import safeFromLocalStorage from "~/lib/safeFromLocalStorage.ts";

const applicationFromLocalStorage = (url: string): Result<Application> => {
  return safeFromLocalStorage(url, ApplicationSchema);
};

export default applicationFromLocalStorage;
