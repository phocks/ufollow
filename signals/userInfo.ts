import type { User } from "~/types/User.ts";
import { effect, signal } from "@preact/signals";
import { debounce } from "jsr:@std/async/debounce";

const userInfo = signal(JSON.parse(localStorage.getItem("user-info") || "{}"));

function setUserInfoInLocalStorage(userInfo: any) {
  localStorage.setItem("user-info", JSON.stringify(userInfo.value));
}

const debouncedSetUserInfo = debounce(setUserInfoInLocalStorage, 500);

effect(() => {
  debouncedSetUserInfo(userInfo);
});

export default userInfo;
