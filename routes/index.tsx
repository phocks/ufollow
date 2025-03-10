import { Handlers, PageProps } from "$fresh/server.ts";
import Input from "~/components/Input.tsx";
import Button from "~/components/Button.tsx";

interface Data {
  user: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const user = url.searchParams.get("user") || "";
    console.log(user);
    return ctx.render({ user });
  },
};

export default function (props: PageProps<Data>) {
  const { user } = props.data;
  return (
    <form>
      {/* <input type="text" name="q" value={query} /> */}
      <Input value={user}></Input>
      <Button>Submit</Button>
      {/* <button type="submit">Search</button> */}
    </form>
  );
}
