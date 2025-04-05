import { domain, username } from "../signals/auth.ts";

const InfoLogger = () => {
  return (
    <div class="flex flex-col gap-0">
      <div>
        <span class="text-gray-500 mr-1">Username:</span>
        <span>{username}</span>
      </div>

      <div>
        <span class="text-gray-500 mr-1">Domain:</span>
        <span>{domain}</span>
      </div>
    </div>
  );
};

export default InfoLogger;
