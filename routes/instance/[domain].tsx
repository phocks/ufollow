import { Handlers, PageProps } from "$fresh/server.ts";

const DomainPage = (props: PageProps) => {
  const { domain } = props.params;

  return <p>{domain}</p>;
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello World!");
    return resp;
  },
};

export default DomainPage;
