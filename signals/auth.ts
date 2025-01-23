import { computed, effect, signal } from "@preact/signals";

export const username = signal<string>(localStorage.getItem("username") || "");

username.subscribe((value) => {
  localStorage.setItem("username", value);
});

export const domain = signal<string>(localStorage.getItem("domain") || "");

domain.subscribe((value) => {
  localStorage.setItem("domain", value);
});

export const parsedDomain = signal<string | null>(null);