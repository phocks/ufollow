// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $authenticate from "./routes/authenticate.tsx";
import * as $create_app from "./routes/create-app.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $AppCreate from "./islands/AppCreate.tsx";
import * as $EffectRunner from "./islands/EffectRunner.tsx";
import * as $UserCheck from "./islands/UserCheck.tsx";
import * as $UserLogin from "./islands/UserLogin.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/authenticate.tsx": $authenticate,
    "./routes/create-app.tsx": $create_app,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
  },
  islands: {
    "./islands/AppCreate.tsx": $AppCreate,
    "./islands/EffectRunner.tsx": $EffectRunner,
    "./islands/UserCheck.tsx": $UserCheck,
    "./islands/UserLogin.tsx": $UserLogin,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
