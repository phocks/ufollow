import { signal } from "@preact/signals";
import { MastodonApplication } from "~/types/MastodonApplication.ts";

export const mastodonApplicationSignal = signal<MastodonApplication | null>(
  null,
);
