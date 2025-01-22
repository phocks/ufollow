import { signal } from "@preact/signals";

export const username = signal<string | null>(null);
export const domain = signal<string | null>(null);