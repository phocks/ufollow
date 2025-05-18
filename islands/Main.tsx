import { userInfoSignal as user } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal as app } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal as token } from "~/signals/accessTokenSignal.ts";
import {
  usersNotFollowedBySignal,
  addUsersNotFollowedBy,
  clearUsersNotFollowedBy,
  type NotFollowedByItem,
} from "~/signals/usersNotFollowedBySignal.ts";

import { untracked, useSignal, useSignalEffect } from "@preact/signals";
import { createRestAPIClient, mastodon } from "masto";

const NUMBER_OF_ACCOUNTS_TO_FETCH = 80;

async function* generateUsersNotFollowedByBatch(
  mastoClient: mastodon.rest.Client,
  userAccountId: string,
): AsyncGenerator<NotFollowedByItem[]> {
  const followingPaginator = mastoClient.v1.accounts.$select(userAccountId)
    .following.list({
      limit: NUMBER_OF_ACCOUNTS_TO_FETCH,
    });

  for await (const followingPage of followingPaginator) {
    if (followingPage.length === 0) {
      break;
    }

    const ids = followingPage.map((account: mastodon.v1.Account) => account.id);
    const relationships = await mastoClient.v1.accounts.relationships.fetch({ id: ids });

    const notFollowingBackRelationships = relationships.filter(
      (relationship: mastodon.v1.Relationship) => !relationship.followedBy,
    );

    const batchDetails = notFollowingBackRelationships.map((relationship: mastodon.v1.Relationship) => {
      const matchingAccount = followingPage.find((acc) => acc.id === relationship.id);
      // Ensure matchingAccount is found, otherwise, this item might be problematic
      return { relationship, account: matchingAccount! }; // Using non-null assertion, ensure this is safe
    }).filter((item: { account: mastodon.v1.Account | undefined }) => item.account); // Filter out any items where account might be undefined

    if (batchDetails.length > 0) {
      yield batchDetails;
    }
  }
}

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

      for await (const batch of generateUsersNotFollowedByBatch(mastoClient, userAccount.id)) {
        addUsersNotFollowedBy(batch);
      }
    } catch (error) {
      console.error("Error fetching following data:", error);
    } finally {
      isLoading.value = false;
    }
  }

  useSignalEffect(() => {
    processFollowingData();
  });

  return (
    <div>
      <h2>
        Users who don't follow you back ({usersNotFollowedBySignal.value
          .length}){" "}
        {isLoading.value ? <span>Loading...</span> : <span>All done!</span>}
      </h2>
      <ul>
        {usersNotFollowedBySignal.value.map((item) => (
          <li key={item.relationship.id}>
            <a
              href={`https://${user.value.domain}/@${item.account.acct}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.account.displayName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
