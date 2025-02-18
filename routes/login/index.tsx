import LoginIsland from "../../islands/LoginIsland.tsx";
import TestIsland from "../../islands/TestIsland.tsx";

const Unfollower = () => {
  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="m-4">
        <LoginIsland />
        <TestIsland />
      </div>
    </div>
  );
};

export default Unfollower;
