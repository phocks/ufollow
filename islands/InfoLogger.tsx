import { domain, username } from "../signals/auth.ts";
import { effect } from "@preact/signals";

effect(() => {
  console.log("username is", username.value);
  console.log("domain is", domain.value);
});

const InfoLogger = () => {
  if (!username.value || !domain.value) {
    return <div class="text-gray-500">No identity set</div>;
  }
  return (
    <div class="flex gap-0 items-center">
      <span class="text-gray-500">@</span>
      <span>{username}</span>
      <span class="text-gray-500">@</span>
      <span>{domain}</span>
    </div>
  );
};

export default InfoLogger;
