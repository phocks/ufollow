import { useSignal } from "@preact/signals";
import IdentityInput from "../islands/IdentityInput.tsx";
import AppRegister from "../islands/AppRegister.tsx";

export default function Unfollower() {
  const count = useSignal(0);

  return (
    <div class="m-4">
      <IdentityInput />
      <AppRegister />
    </div>
  );
}