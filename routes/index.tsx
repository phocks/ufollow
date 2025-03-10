import { Handlers, PageProps } from "$fresh/server.ts";
import Input from "~/components/Input.tsx";
import Button from "~/components/Button.tsx";

interface Data {
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("user") || "";
    return ctx.render({ query });
  },
};

export default function (props: PageProps<Data>) {
  const { query } = props.data;
  return (
    <form>
      {/* <input type="text" name="q" value={query} /> */}
      <Input value={query}></Input>
      <Button>Submit</Button>
      {/* <button type="submit">Search</button> */}
    </form>
  );
}
