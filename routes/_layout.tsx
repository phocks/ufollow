import { PageProps } from "$fresh/server.ts";

const Layout = ({ Component, state }: PageProps) => {
  return (
    <div class="layout min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div class="w-full max-w-md bg-white p-6">
        <div class="navigation mb-4">
          <Component />
        </div>
      </div>
    </div>
  );
};

export default Layout;
