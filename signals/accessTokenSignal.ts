import { signal } from "@preact/signals";
import { AccessToken } from "~/types/AccessToken.ts";

export const accessTokenSignal = signal<AccessToken | null>(
  null,
);
