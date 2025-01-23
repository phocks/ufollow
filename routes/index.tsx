import LoginIsland from "../islands/LoginIsland.tsx";
import TestIsland from "../islands/TestIsland.tsx";

const Unfollower = () => {
  return (
    <div class="m-4 flex flex-col gap-2">
      <LoginIsland />
      <TestIsland />
    </div>
  );
}

export default Unfollower;