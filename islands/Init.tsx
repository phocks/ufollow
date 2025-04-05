import { untracked, useSignalEffect } from "@preact/signals";

const Init = () => {
  useSignalEffect(() =>
    untracked(() => {
      console.log("Init component mounted");
    })
  );

  return <div class="init"></div>;
};

export default Init;
