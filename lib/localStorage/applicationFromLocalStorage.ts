import { type Application, ApplicationSchema } from "~/types/Application.ts";
import { err, ok, Result } from "neverthrow";
import safeFromLocalStorage from "./safeFromLocalStorage.ts";

const applicationFromLocalStorage = (url: string) => {
  return safeFromLocalStorage(`application:${url}`, ApplicationSchema);
};

export default applicationFromLocalStorage;
