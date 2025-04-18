import { FreshContext } from "$fresh/server.ts";

function loadData(): Promise<{ greeting: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ greeting: "Hello, World!" });
    }, 1);
  });
}

export default async function Layout(req: Request, ctx: FreshContext) {
  // do something with state here
  const data = await loadData();

  return (
    <div class="layout">
      <p>{data.greeting}</p>
      <ctx.Component />
    </div>
  );
}
