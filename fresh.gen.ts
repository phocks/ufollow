// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $index from "./routes/index.tsx";
import * as $instance_domain_ from "./routes/instance/[domain].tsx";
import * as $InfoLogger from "./islands/InfoLogger.tsx";
import * as $LoginIsland from "./islands/LoginIsland.tsx";
import * as $TestIsland from "./islands/TestIsland.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/index.tsx": $index,
    "./routes/instance/[domain].tsx": $instance_domain_,
  },
  islands: {
    "./islands/InfoLogger.tsx": $InfoLogger,
    "./islands/LoginIsland.tsx": $LoginIsland,
    "./islands/TestIsland.tsx": $TestIsland,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
