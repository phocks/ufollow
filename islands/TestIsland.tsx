import IdentityInput from "../components/IdentityInput.tsx";
import { useEffect } from "preact/hooks";
import { domain, username } from "../signals/auth.ts";

const TestIsland = () => {
  return (
    <div>
      <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => {
          console.log("test");
        }}
      >
        Test
      </button>
    </div>
  );
};

export default TestIsland;
