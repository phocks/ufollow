import { PageProps } from "$fresh/server.ts";

export default function DomainPage(props: PageProps) {
  const { domain } = props.params;

  return (
    <main>
      {domain}
    </main>
  );
}
