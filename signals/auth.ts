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

interface Application {
  client_id: string;
  client_secret: string;
}

export const application = signal<Application | null>(null);

// Subscribe to baseUrl changes
baseUrl.subscribe(async (url) => {
  if (!url) {
    return;
  }

  const currentDomain = new URL(url).host;
  const storageKey = `application:${currentDomain}`;

  const cached = localStorage.getItem(storageKey);
  if (cached) {
    application.value = JSON.parse(cached);
    return;
  }

  const app = await registerApplication(url);
  localStorage.setItem(storageKey, JSON.stringify(app));
  application.value = app;
});

application.subscribe((value) => {
  console.log("Application changed:", value);
});
