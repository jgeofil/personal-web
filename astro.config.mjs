import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import mdx from "@astrojs/mdx";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [mdx()],
});