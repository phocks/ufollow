import { computed, effect, signal } from "@preact/signals";
import { mite } from "~/lib/persistentSignal.ts";
import { registerApplication } from "../lib/application.ts";
import { AccessTokenResponse } from "../components/AuthCodeInput.tsx";

const tokenTest = async (url: string, token: AccessTokenResponse) => {
  const response = await fetch(url + "/api/v1/accounts/verify_credentials", {
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error verifying token: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Test data:", data);
  return data;
};

export const username = mite<string>("username", "");
export const domain = mite<string>("domain", "");

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

  {
    const currentDomain = new URL(url).host;
    const storageKey = `application:${currentDomain}`;

    const cached = localStorage.getItem(storageKey);
    if (cached) {
      application.value = JSON.parse(cached);
    } else {
      const app = await registerApplication(url);
      localStorage.setItem(storageKey, JSON.stringify(app));
      application.value = app;
    }
  }

  {
    const currentDomain = new URL(url).host;
    const storageKey = `access-token:${currentDomain}`;

    const cached = localStorage.getItem(storageKey);
    if (cached) {
      accessToken.value = JSON.parse(cached);
    }
  }
});

export const accessToken = signal<AccessTokenResponse | null>(null);

accessToken.subscribe((token: any) => {
  if (!baseUrl.value) {
    return;
  }

  if (!token) {
    return;
  }

  const currentDomain = new URL(baseUrl.value).host;
  const storageKey = `access-token:${username}@${currentDomain}`;

  localStorage.setItem(storageKey, JSON.stringify(token));
});
