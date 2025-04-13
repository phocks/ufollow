import type { User } from "~/types/User.ts";
import { effect, signal } from "@preact/signals";
import { debounce } from "@std/async/debounce";
import { IS_BROWSER } from "$fresh/runtime.ts";

function getDefaultUserInfo() {
  if (IS_BROWSER) {
    const stored = localStorage.getItem("user-info");
    if (stored) {
      return JSON.parse(stored);
    }
  }
}

function setUserInfoInLocalStorage(userInfo: any) {
  localStorage.setItem("user-info", JSON.stringify(userInfo.value));
}

const debouncedSetUserInfo = debounce(setUserInfoInLocalStorage, 500);

const userInfo = signal(getDefaultUserInfo());

effect(() => {
  debouncedSetUserInfo(userInfo);
});

export default userInfo;
