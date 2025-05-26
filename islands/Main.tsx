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

function isAuthed() {
  return (
    user.value.username && app.value.client_id && token.value.access_token
  );
}

const Main = () => {
  const isLoading = useSignal<boolean>(false);
  const mastoClient = useSignal<any>(null);

  function initializeMastoClient() {
    if (isAuthed() && !mastoClient.value) {
      const url = new URL(`https://${user.value.domain}`);
      mastoClient.value = createRestAPIClient({
        url: url.origin,
        accessToken: token.value?.access_token,
      });
    }
  }

  async function processFollowingData() {
    isLoading.value = true;

    try {
      await initializeMastoClient();

      if (!mastoClient.value) {
        throw new Error("Failed to initialize Mastodon client");
      }

      const userAccount = await mastoClient.value.v1.accounts
        .verifyCredentials();

      for await (
        const batch of generateUsersNotFollowedByBatch(
          mastoClient.value,
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
    if (isAuthed()) {
      processFollowingData();
    }
  }, []);

  if (!isAuthed()) {
    return <div></div>;
  }

  const firstUser = usersNotFollowedBySignal.value.length > 0
    ? usersNotFollowedBySignal.value[0]
    : null;

  async function handleUnfollow() {
    if (!mastoClient.value || !firstUser) return;

    try {
      await mastoClient.value.v1.accounts.$select(firstUser.account.id)
        .unfollow();

      usersNotFollowedBySignal.value = usersNotFollowedBySignal.value
        .filter((user: NotFollowedByItem) =>
          user.account.id !== firstUser.account.id
        );

      console.log("Unfollowed successfully");
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  }

  function handleSkip() {
    if (usersNotFollowedBySignal.value.length > 0) {
      usersNotFollowedBySignal.value = usersNotFollowedBySignal.value.slice(1);
    }
  }

  return (
    <div class="space-y-4">
      <p>
        {isLoading.value ? <span>Loading</span> : <span>Loaded</span>}{" "}
        ({usersNotFollowedBySignal.value.length}) users not following you.
      </p>

      <p>
        <div>
          {firstUser && (
            <>
              <div class="flex items-center space-x-2">
                <img
                  src={firstUser.account.avatar}
                  alt="Avatar"
                  class="w-16 h-16 rounded-lg"
                />
                <div>
                  <div>
                    <a href={firstUser.account.url} target="_blank" rel="noopener noreferrer">
                      {firstUser.account.displayName}
                    </a>
                  </div>

                  <div class="text-sm text-gray-500">
                    {firstUser.account.acct}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </p>

      <p class="flex space-x-2">
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>

        <button
          type="button"
          class="btn btn-primary"
          onClick={handleSkip}
        >
          Skip
        </button>
      </p>
    </div>
  );
};

export default Main;
