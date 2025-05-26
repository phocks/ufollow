import { userInfoSignal as user } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal as app } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal as token } from "~/signals/accessTokenSignal.ts";

import LogoutButton from "~/components/LogoutButton.tsx";

const User = () => {
  if (
    !user.value.username || !app.value.client_id || !token.value.access_token
  ) {
    return <div></div>;
  }

  return (
    <div class="text-right">
      <LogoutButton />
    </div>
  );
};

export default User;
