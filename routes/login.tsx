import { Handlers, PageProps } from "$fresh/server.ts";
import UserLogin from "~/islands/UserLogin.tsx";
import LoginForm from "~/components/LoginForm.tsx";
import { isEmptyString } from "~/lib/utils.ts";

interface Data {
  handle: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const handle = url.searchParams.get("handle") || "";
    return ctx.render({ handle });
  },
};

const Login = ({ data }: PageProps<Data>) => {
  const { handle } = data;

  if (isEmptyString(handle)) {
    return <LoginForm />;
  } else {
    return <UserLogin handle={handle} />;
  }
};

export default Login;
