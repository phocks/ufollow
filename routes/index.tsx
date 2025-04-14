import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "@std/http/cookie";
// import UserCheck from "~/islands/UserCheck.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    console.log("cookies", cookies);
    return ctx.render({});
  },
};

const Index = () => {
  return (
    <>
      {/* <UserCheck /> */}
      <div>Hello World!</div>
    </>
  );
};

export default Index;
