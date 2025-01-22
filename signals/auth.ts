import { computed, signal } from "@preact/signals";

export const username = signal<string | null>(null);
export const domain = signal<string | null>(null);

export const isIdentitySet = computed(() =>
  username.value !== null && domain.value !== null
);
