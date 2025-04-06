import { untracked, useSignalEffect } from "@preact/signals";
import userInfoFromLocalStorage from "~/lib/userInfoFromLocalStorage.ts";
import { match, P } from "ts-pattern";

const init = () => {
  match(userInfoFromLocalStorage())
    .with({ ok: true }, (result) => {
      console.log("User Info:", result.value);
    })
    .with({ ok: false }, (result) => {
      console.error("Error:", result.error);
    })
    .exhaustive();
};

const Index = () => {
  useSignalEffect(() => untracked(() => init()));

  return <div class="init"></div>;
};

export default Index;
