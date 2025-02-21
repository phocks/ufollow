import { z } from "zod";
import { match, P } from "ts-pattern";
import { getClientToken, registerApplication } from "~/lib/application.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

const urlSchema = z.string().url();

const getApplication = async (baseUrl: string) => {
  const currentDomain = new URL(baseUrl).host;

  // Get the application from the cache
  const applicationStorageKey = `application:${currentDomain}`;
  console.log("applicationStorageKey:", applicationStorageKey);
  const cachedApplication = localStorage.getItem(applicationStorageKey);

  console.log("cachedApplication:", cachedApplication);

  // If the application is not cached, register it
  const application = await match(cachedApplication)
    .with(null, async () => await registerApplication(baseUrl))
    .with(P.string, (cached) => JSON.parse(cached))
    .otherwise(() => {
      throw new Error("Invalid application cache");
    });

  // Set local storage if the application is not cached
  if (!cachedApplication) {
    localStorage.setItem(applicationStorageKey, JSON.stringify(application));
  }

  return application;
};

const getToken = async (
  baseUrl: string,
  clientId: string,
  clientSecret: string,
) => {
  const token = await getClientToken(
    { baseUrl, clientId, clientSecret },
  );

  return token;
};

const doAuth = async (baseUrl: string) => {
  const application = await getApplication(baseUrl);
  console.log("application:", application);


  const token = await getToken(
    baseUrl,
    application.client_id,
    application.client_secret,
  );

  return token;
};

const Main = (props: any) => {
  const { domain, username } = props.data;
  const baseUrl = urlSchema.parse("https://" + domain);
  const user = { username: username.replace("@", "") };

  if (IS_BROWSER) {
    doAuth(baseUrl).then((token) => {
      console.log("token:", token);
    });
  }

  return (
    <div class="">
    </div>
  );
};

export default Main;
