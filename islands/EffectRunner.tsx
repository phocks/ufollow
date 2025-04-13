import { Effect, Option, Console } from "effect";
import { untracked, useSignalEffect } from "@preact/signals";

const main = Console.log('Hello, World!')

function EffectRunner({
  effect,
}: {
  effect: Effect.Effect<any, any>;
}) {
  const init = () => {
    console.log("EffectRunner component mounted...");
    // Run the effect
    const result = Effect.runSync(main);

    
  };

  useSignalEffect(() => untracked(() => init()));
  return <div></div>;
}

export default EffectRunner;
