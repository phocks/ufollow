import LoginIsland from "../islands/LoginIsland.tsx";
import InfoLogger from "../islands/InfoLogger.tsx";

const Unfollower = () => {
  return (
    <div class="m-4 flex flex-col gap-2">
      <InfoLogger />
      <LoginIsland />
    </div>
  );
}

export default Unfollower;