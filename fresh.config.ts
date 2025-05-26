import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";

export default defineConfig({
  server: {
    port: 8000,
    hostname: "0.0.0.0",
  },
  plugins: [tailwind()],
});
