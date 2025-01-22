import { domain, username } from "../signals/auth.ts";
import { effect } from "@preact/signals";

// effect(() => {
//   console.log("username is", username.value);
// });

// effect(() => {
//   console.log("domain is", domain.value);
// });

const InfoLogger = () => {
  console.log("username is", username.value);
  console.log("domain is", domain.value);
  return (
    <div class="flex gap-2 items-center">
      <span class="text-gray-500">@</span>
      <span>{username}</span>
      <span class="text-gray-500">@</span>
      <span>{domain}</span>
    </div>
  );
};

export default InfoLogger;
