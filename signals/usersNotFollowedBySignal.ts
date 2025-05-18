import { signal } from "@preact/signals";
import { mastodon } from "masto"; // Import types from masto

// Define a type for the items in the signal
export interface NotFollowedByItem {
  relationship: mastodon.v1.Relationship;
  account: mastodon.v1.Account;
}

export const usersNotFollowedBySignal = signal<NotFollowedByItem[]>([]);

export function addUsersNotFollowedBy(users: NotFollowedByItem[]) {
  usersNotFollowedBySignal.value = [
    ...usersNotFollowedBySignal.value,
    ...users,
  ];
}

export function clearUsersNotFollowedBy() {
  usersNotFollowedBySignal.value = [];
}
