import { useSignal } from "@preact/signals";
import IdentityInput from "../islands/IdentityInput.tsx";
import AppRegister from "../islands/AppRegister.tsx";

export default function Unfollower() {
  const username = useSignal("");
  const domain = useSignal("");

  return (
    <div class="m-4">
      <IdentityInput username={username} domain={domain} />
      <AppRegister username={username} domain={domain} />
    </div>
  );
}
