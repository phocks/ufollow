import { createRestAPIClient, mastodon } from "masto";
import {
  type NotFollowedByItem,
} from "~/signals/usersNotFollowedBySignal.ts";

const NUMBER_OF_ACCOUNTS_TO_FETCH = 80;

export async function* generateUsersNotFollowedByBatch(
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
    const relationships = await mastoClient.v1.accounts.relationships.fetch({
      id: ids,
    });

    const notFollowingBackRelationships = relationships.filter(
      (relationship: mastodon.v1.Relationship) => !relationship.followedBy,
    );

    const batchDetails = notFollowingBackRelationships.map(
      (relationship: mastodon.v1.Relationship) => {
        const matchingAccount = followingPage.find((acc) =>
          acc.id === relationship.id
        );
        // TODO: Ensure matchingAccount is found, otherwise, this item might be problematic
        return { relationship, account: matchingAccount! }; // Using non-null assertion, ensure this is safe
      },
    ).filter((item: { account: mastodon.v1.Account | undefined }) =>
      item.account
    );

    if (batchDetails.length > 0) {
      yield batchDetails;
    }
  }
}