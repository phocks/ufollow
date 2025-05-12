import { Handlers, PageProps } from "$fresh/server.ts";
import { match, P } from "ts-pattern";
import UserLogin from "~/islands/auth/UserLogin.tsx";
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

  return match(isEmptyString(handle))
    .with(true, () => <LoginForm />)
    .with(false, () => <UserLogin handle={handle} />)
    .exhaustive();
};

export default Login;
