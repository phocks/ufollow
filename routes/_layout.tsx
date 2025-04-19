import { PageProps } from "$fresh/server.ts";

const Layout = ({ Component, state }: PageProps) => {
  return (
    <div class="layout">
      <Component />
    </div>
  );
};

export default Layout;
