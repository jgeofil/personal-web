import { bindings, defineConfig } from "cf/config";

/**
 * Secret-like files were detected but not read or migrated: .env.local, dist/server/.prerender/.dev.vars. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
  worker: {
    name: "personal-web",
    compatibilityDate: "2026-11-01",
    compatibilityFlags: ["global_fetch_strictly_public"],
    entrypoint: "@astrojs/cloudflare/entrypoints/server",
    observability: {
      enabled: true,
    },
    env: {
      ASSETS: bindings.assets(),
    },
  },
});
