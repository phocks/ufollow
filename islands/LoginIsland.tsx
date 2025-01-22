import IdentityInput from "../components/IdentityInput.tsx";
import { useEffect } from "preact/hooks";
import { domain, username } from "../signals/auth.ts";

const LoginIsland = () => {
  useEffect(() => { // Check localStorage for username and domain
    const storedUsername = localStorage.getItem("username");
    const storedDomain = localStorage.getItem("domain");

    if (storedUsername) {
      username.value = storedUsername;
    }

    if (storedDomain) {
      domain.value = storedDomain;
    }

    console.log("LoginIsland mounted");

    return () => {
      console.log("LoginIsland unmounted");
    };
  }, []);

  return <IdentityInput />;
};

export default LoginIsland;
