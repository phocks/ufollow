import { useSignal } from "@preact/signals";
import UserCheck from "~/islands/auth/UserCheck.tsx";
import Main from "~/islands/Main.tsx";

const Index = () => {
  const userInfo = useSignal({});
  const accessToken = useSignal({});

  return (
    <>
      <UserCheck />
      <Main />
    </>
  );
};

export default Index;
