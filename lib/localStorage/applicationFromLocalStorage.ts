import {
  type MastodonApplication,
  MastodonApplicationSchema,
} from "~/types/MastodonApplication.ts";
import { err, ok, Result } from "neverthrow";
import safeFromLocalStorage from "./safeFromLocalStorage.ts";

const applicationFromLocalStorage = (url: string) => {
  return safeFromLocalStorage(`application:${url}`, MastodonApplicationSchema);
};

export default applicationFromLocalStorage;
