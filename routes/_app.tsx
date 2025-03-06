import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ufollow - an app by @phocks@bne.social</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="dark:bg-gray-900 dark:text-white">
        <div class="m-6">
          <Component />
        </div>
      </body>
    </html>
  );
}
