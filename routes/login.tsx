import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("handle") || "";
    return ctx.render({ query });
  },
};

const Login = ({ data }: PageProps<Data>) => {
  const { query } = data;

  if (query === "") {
    return (
      <>
        <p>
          Please enter your fediverse address...
        </p>

        <div class="my-4">
          <form class="flex gap-2">
            <input
              name="handle"
              type="text"
              placeholder="@user@domain.com"
              class=""
            />
            <button type="submit" class="btn">Continue</button>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Setting user...</div>
      </>
    );
  }
};

export default Login;
