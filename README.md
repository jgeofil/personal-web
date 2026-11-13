# Astro + Cloudflare

This repository contains the source code for [jeremygf.com](https://jeremygf.com) built with [Astro](https://astro.build/) and deployed to [Cloudflare](https://developers.cloudflare.com/workers/).

- `/` - About me (pre-rendered)
- `/cv` - Curriculum Vitae (pre-rendered)
- `/privacy` - Privacy policy (pre-rendered)
- `/edge.json` - Server-side API endpoint

## Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `bun install` | Installs dependencies |
| `bun run dev` | Starts local dev server |
| `bun run build` | Builds production site with `@astrojs/cloudflare` |
| `bun test` | Runs unit tests |
| `bun run preview` | Previews the build locally |
| `bun x wrangler deploy` | Deploys the site to Cloudflare Workers |
