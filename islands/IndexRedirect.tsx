import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/userInfoFromLocalStorage.ts";

const init = () => {
  const userInfoResult = userInfoFromLocalStorage();

  console.log("User Info Result:", userInfoResult);
};

const Index = () => {
  useSignalEffect(() => untracked(() => init()));

  return <div class="init"></div>;
};

export default Index;
