import { Handlers, PageProps } from "$fresh/server.ts";
import AuthCodeCreate from "~/islands/AuthCodeCreate.tsx";
import { buildAuthorizationUrl } from "~/lib/buildAuthorizationUrl.ts";

interface Data {
  authCode: string;
  domain: string;
  clientId: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const authCode = url.searchParams.get("auth-code") || "";
    const domain = url.searchParams.get("domain") || "";
    const clientId = url.searchParams.get("client-id") || "";
    return ctx.render({ authCode, domain, clientId });
  },
};

const Authenticate = ({ data }: PageProps<Data>) => {
  const { authCode, domain, clientId } = data;

  if (authCode === "") {
    return (
      <div>
        <p>Please authenticate to continue.</p>

        <div class="my-4">
          <a
            href={buildAuthorizationUrl(domain, clientId)}
            target="_blank"
            class=""
          >
            Authorize {"-->"}
          </a>
        </div>
        <div class="my-4">
          <form class="flex gap-2">
            <input
              type="text"
              placeholder="<authorization_code>"
              class=""
            />
            <button type="submit" class="btn">Auth</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <AuthCodeCreate authCode={authCode} />;
  }
};

export default Authenticate;
