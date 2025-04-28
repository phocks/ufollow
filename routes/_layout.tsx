import { PageProps } from "$fresh/server.ts";

const Layout = ({ Component, state }: PageProps) => {
  return (
    <div class="layout">
      <div class="navigation"></div>
      <Component />
    </div>
  );
};

export default Layout;
