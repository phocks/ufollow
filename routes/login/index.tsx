import { Handlers, PageProps } from "$fresh/server.ts";
import { parseMastodonUser } from "~/lib/parseMastodonUser.ts";
import UserCheck from "~/islands/UserCheck.tsx";

interface Data {
  user: string;
  parsedUser: ReturnType<typeof parseMastodonUser>; // Typescript utility to get the return type
  error?: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const user = url.searchParams.get("user") || "";

    // Parse the user in the handler
    const parsedUser = parseMastodonUser(user);

    // If user was provided but invalid, include an error message
    const error = user && !parsedUser
      ? "Invalid Mastodon user format"
      : undefined;

    // Pass both the original and parsed data to the component
    return ctx.render({ user, parsedUser, error });
  },
};

export default function (props: PageProps<Data>) {
  const { user, parsedUser, error } = props.data;

  // Handle the error case
  if (error) {
    return (
      <div class="error-container">
        <div class="error-message">{error}</div>
        <div>Provided user: {user}</div>
        <a href="/">Go Back</a>
      </div>
    );
  }

  // Handle empty state
  if (!user) {
    return <div>No user provided</div>;
  }

  // Handle valid user case
  return (
    <div>
      {parsedUser && (
        <UserCheck
          username={parsedUser.username}
          domain={parsedUser.domain}
        />
      )}
    </div>
  );
}
