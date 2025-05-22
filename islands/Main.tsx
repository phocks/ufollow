import { userInfoSignal as user } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal as app } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal as token } from "~/signals/accessTokenSignal.ts";
import {
  addUsersNotFollowedBy,
  clearUsersNotFollowedBy,
  type NotFollowedByItem,
  usersNotFollowedBySignal,
} from "~/signals/usersNotFollowedBySignal.ts";
import { generateUsersNotFollowedByBatch } from "~/lib/generateUsersNotFollowedByBatch.ts";

import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { createRestAPIClient, mastodon } from "masto";

const Main = () => {
  const isLoading = useSignal<boolean>(false);

  async function processFollowingData() {
    if (!user.value || !app.value || !token.value) {
      clearUsersNotFollowedBy();
      isLoading.value = false;
      return;
    }

    isLoading.value = true;
    clearUsersNotFollowedBy();

    try {
      const url = new URL(`https://${user.value.domain}`);
      const mastoClient = createRestAPIClient({
        url: url.origin,
        accessToken: token.value?.access_token,
      });

      const userAccount = await mastoClient.v1.accounts.verifyCredentials();

      for await (
        const batch of generateUsersNotFollowedByBatch(
          mastoClient,
          userAccount.id,
        )
      ) {
        addUsersNotFollowedBy(batch);
      }
    } catch (error) {
      console.error("Error fetching following data:", error);
    } finally {
      isLoading.value = false;
    }
  }

  useEffect(() => {
    processFollowingData();
  }, []);

  return (
    <div>
      <h2>
        Users who don't follow you back ({usersNotFollowedBySignal.value
          .length}){" "}
        {isLoading.value ? <span>Loading...</span> : <span>All done!</span>}
      </h2>
    </div>
  );
};

export default Main;
