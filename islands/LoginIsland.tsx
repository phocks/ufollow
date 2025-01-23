import IdentityInput from "../components/IdentityInput.tsx";
import { useEffect } from "preact/hooks";
import { domain, username } from "../signals/auth.ts";

const LoginIsland = () => {
  return <IdentityInput />;
};

export default LoginIsland;
