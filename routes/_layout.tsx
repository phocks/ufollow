import { PageProps } from "$fresh/server.ts";

// Islands
import LoginLogout from "../islands/LoginLogout.tsx";

const Layout = ({ Component, state }: PageProps) => {
  return (
    <div class="layout">
      <LoginLogout />
      <Component />
    </div>
  );
};

export default Layout;
