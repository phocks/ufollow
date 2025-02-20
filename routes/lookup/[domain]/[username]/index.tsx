import { z } from "zod";
import { Handlers, PageProps } from "$fresh/server.ts";

const urlSchema = z.string().url();

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { domain, username } = ctx.params;
    const baseUrl = urlSchema.parse("https://" + domain);

    console.log("baseUrl:", baseUrl);

    const resp = await ctx.render();
    return resp;
  },
};

const GreetPage = (props: PageProps) => {
  return (
    <main>
      <p>Greetings to you!</p>
    </main>
  );
};

export default GreetPage;
