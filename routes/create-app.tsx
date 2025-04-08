import { Handlers, PageProps } from "$fresh/server.ts";
import AppCreate from "~/islands/AppCreate.tsx";

interface Data {
  domain: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const domain = url.searchParams.get("domain") || "";
    return ctx.render({ domain });
  },
};

const CreateApp = ({ data }: PageProps<Data>) => {
  const { domain } = data;

  return (
    <>
      <p>Creating app...</p>
      <AppCreate domain={domain} />
    </>
  );
};

export default CreateApp;
