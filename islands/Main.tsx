import { z } from "zod";
import { Handlers, PageProps } from "$fresh/server.ts";
import { match, P } from "ts-pattern";
import { registerApplication } from "~/lib/application.ts";

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

const Main = (props: any) => {
  const { domain, username } = props.data;
  const baseUrl = urlSchema.parse("https://" + domain);
  const user = { username: username.replace("@", "") };

  getApplication(baseUrl).then((application) => {
    console.log("application:", application);
  });

  return (
    <div class="">
    </div>
  );
};

export default Main;
