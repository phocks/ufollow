import IdentityInput from "../components/IdentityInput.tsx";
import LoginLink from "../components/LoginLink.tsx";
import AuthCodeInput from "../components/AuthCodeInput.tsx";

const LoginIsland = () => {
  return (
    <>
      <IdentityInput />
      <LoginLink />
      <AuthCodeInput />
    </>
  );
};

export default LoginIsland;
