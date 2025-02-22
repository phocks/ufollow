import { z } from "zod";
import { match, P } from "ts-pattern";
import {
  accountLookup,
  getAccountFollowing,
  getAllFollowing,
  getClientToken,
  registerApplication,
  verifyCredentials,
} from "~/lib/application.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

const urlSchema = z.string().url();

const getApplication = async (baseUrl: string) => {
  const currentDomain = new URL(baseUrl).host;

  // Get the application from the cache
  const applicationStorageKey = `application:${currentDomain}`;
  console.log("applicationStorageKey:", applicationStorageKey);
  const cachedApplication = localStorage.getItem(applicationStorageKey);

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

const doAuth = async (baseUrl: string, user: string) => {
  const application = await getApplication(baseUrl);

  const token = await getToken(
    baseUrl,
    application.client_id,
    application.client_secret,
  );

  console.log("token:", token);

  const verification = await verifyCredentials(baseUrl, token.access_token);

  console.log("verification:", verification);

  const account = await accountLookup(baseUrl, user);

  console.log("account:", account);

  return { token, verification, account };
};

const init = async (baseUrl: string, username: string) => {
  const response = await doAuth(baseUrl, username);
  console.log("response:", response);

  const following = await getAccountFollowing(
    baseUrl,
    response.account.id,
    response.token.access_token,
  );
  console.log("following:", following);

  // const allFollowing = await getAllFollowing(
  //   baseUrl,
  //   response.account.id,
  //   response.token.access_token,
  // );
  // console.log("allFollowing:", allFollowing);
};

const Main = (props: any) => {
  const { domain, username } = props.data;
  const baseUrl = urlSchema.parse("https://" + domain);
  const user = { username: username.replace("@", "") };

  useEffect(() => {
    init(baseUrl, user.username);
  }, []);

  return (
    <div class="">
    </div>
  );
};

export default Main;
