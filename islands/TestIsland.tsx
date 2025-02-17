import IdentityInput from "../components/IdentityInput.tsx";
import { useEffect } from "preact/hooks";
import { baseUrl, domain, username, accessToken } from "../signals/auth.ts";

const TestIsland = () => {
  return (
    <div>
      <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => {
          console.log("test");

          console.log(accessToken.value)

          fetch(`${baseUrl.value}/api/v1/accounts/verify_credentials`, {
            headers: {
              "Authorization": `Bearer ${accessToken.value?.access_token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
            });
        }}
      >
        Test
      </button>
    </div>
  );
};

export default TestIsland;
