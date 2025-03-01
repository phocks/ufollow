import { signal } from "@preact/signals";
const count = signal(0);

import UserDisplay from "~/islands/UserDisplay.tsx";

const Ufollow = () => {
  return (
    <div>
      <UserDisplay count={count} />
    </div>
  );
};

export default Ufollow;
