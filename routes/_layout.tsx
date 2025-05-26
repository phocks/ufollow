import { PageProps } from "$fresh/server.ts";
import User from "~/islands/User.tsx";

const Layout = ({ Component, state }: PageProps) => {
  return (
    <div class="layout min-h-[100dvh] w-full flex flex-col justify-start bg-gray-100 p-4 overflow-auto">
      <div class="">
        <div class="navigation w-full max-w-md min-w-[320px] mx-auto py-6">
          <User />
        </div>
        <div class="w-full max-w-md min-w-[320px] mx-auto bg-white p-6">
          <Component />
        </div>
      </div>
    </div>
  );
};

export default Layout;
