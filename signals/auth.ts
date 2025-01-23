import { computed, effect, signal } from "@preact/signals";
import { registerApplication } from "../utils/application.ts";

export const username = signal<string>(localStorage.getItem("username") || "");

username.subscribe((value) => {
  localStorage.setItem("username", value);
});

export const domain = signal<string>(localStorage.getItem("domain") || "");

domain.subscribe((value) => {
  localStorage.setItem("domain", value);
});

export const baseUrl = signal<string | null>(null);

export const application = signal<object>(
  JSON.parse(localStorage.getItem("application") || "{}"),
);

// Subscribe to baseUrl changes
baseUrl.subscribe(async (url) => {
  if (!url) {
    return;
  }

  const cached = localStorage.getItem("application");
  if (cached) {
    application.value = JSON.parse(cached);
    return;
  }

  const appResponse = await registerApplication(url);
  localStorage.setItem("application", JSON.stringify(appResponse));
  application.value = appResponse;
});

application.subscribe((value) => {
  console.log("Application changed:", value);
});
