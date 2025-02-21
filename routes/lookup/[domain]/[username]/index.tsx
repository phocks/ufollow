import { z } from "zod";
import { Handlers, PageProps } from "$fresh/server.ts";

const urlSchema = z.string().url();

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { domain, username } = ctx.params;
    const baseUrl = urlSchema.parse("https://" + domain);

    console.log("baseUrl:", baseUrl);

    const resp = await ctx.render(baseUrl);
    return resp;
  },
};

const GreetPage = (props: PageProps) => {
  console.log("props:", props);
  return (
    <main>
      <p>Greetings to you {props.data}!</p>
    </main>
  );
};

export default GreetPage;
