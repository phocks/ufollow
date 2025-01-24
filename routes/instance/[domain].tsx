import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

const endpoint = "/api/v2/instance";

interface InstanceInfo {
  domain: string;
  title: string;
}

async function DomainPage(_req: Request, ctx: FreshContext) {
  const instance: InstanceInfo = await fetch(
    "https://" + ctx.params.domain + endpoint,
  ).then((
    res,
  ) => res.json());

  if (!instance) {
    return <h1>Project not found</h1>;
  }

  return (
    <div>
      <div class="container mx-auto">
        <div class="flex flex-row flex-wrap py-4">
          <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
            <div class="sticky top-0 p-4 w-full">
              <ul class="flex flex-col overflow-hidden">
                
              </ul>
            </div>
          </aside>
          <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <h1>{instance.title}</h1>
            <p>{instance.domain}</p>
          </main>
        </div>
      </div>
      <footer class="mt-auto">
        
      </footer>
    </div>
  );
}

export default DomainPage;
