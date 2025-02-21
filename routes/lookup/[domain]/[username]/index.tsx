import { Handlers, PageProps } from "$fresh/server.ts";
import Main from "~/islands/Main.tsx";


export const handler: Handlers = {
  async GET(_req, ctx) {
    const { domain, username } = ctx.params;

    const resp = await ctx.render({ domain, username });
    return resp;
  },
};

const GreetPage = (props: PageProps) => {
  const { domain, username } = props.data;
  
  return (
    <main>
      <Main {...props} />
    </main>
  );
};

export default GreetPage;
