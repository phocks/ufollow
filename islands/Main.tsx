import { userInfoSignal as user } from "~/signals/userInfoSignal.ts";
import { mastodonApplicationSignal as app } from "~/signals/mastodonApplicationSignal.ts";
import { accessTokenSignal as token } from "~/signals/accessTokenSignal.ts";
import { untracked, useSignal, useSignalEffect } from "@preact/signals";
import { createRestAPIClient } from "masto";

const NUMBER_OF_ACCOUNTS_TO_FETCH = 80;

const Main = () => {
  const usersNotFollowedBy = useSignal<any[]>([]);
  const isLoading = useSignal<boolean>(true);

  async function fetchFollowing() {
    if (!user.value || !app.value || !token.value) return;

    const url = new URL(`https://${user.value.domain}`);

    const masto = createRestAPIClient({
      url: url.origin,
      accessToken: token.value?.access_token,
    });

    const userAccount = await masto.v1.accounts.verifyCredentials();

    const followingPaginator = masto.v1.accounts.$select(userAccount.id)
      .following.list({
        limit: NUMBER_OF_ACCOUNTS_TO_FETCH,
      });

    for await (const followingPage of followingPaginator) {
      const ids = followingPage.map((account) => account.id);

      if (ids.length === 0) break;

      // Fetch relationships for this batch
      const relationships = await masto.v1.accounts.relationships.fetch({
        id: ids,
      });

      // Filter accounts that don't follow back
      const notFollowing = relationships.filter(
        (account) => !account.followedBy,
      );

      // Get the corresponding account details
      const notFollowingDetails = notFollowing.map((relationship) => {
        const matchingAccount = followingPage.find((account) =>
          account.id === relationship.id
        );
        return { relationship, account: matchingAccount };
      });

      // Append to our existing results
      usersNotFollowedBy.value = [
        ...usersNotFollowedBy.value,
        ...notFollowingDetails,
      ];

      console.log(usersNotFollowedBy.value);
    }

    isLoading.value = false;
  }

  useSignalEffect(() => {
    untracked(() => {
      fetchFollowing();
    });
  });

  return (
    <div>
      <h2>
        Users who don't follow you back ({usersNotFollowedBy.value
          .length}) {isLoading.value ? <span>Loading...</span> : <span>All done!</span>}
      </h2>
      <ul>
        {usersNotFollowedBy.value.map((item) => (
          <li key={item.relationship.id}>
            {item.account?.display_name || item.account?.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
