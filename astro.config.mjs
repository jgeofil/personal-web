import { defineConfig } from 'astro/config';
// Use Vercel adapter
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    imageService: true,
    webAnalytics: { enabled: true }
  }),
});
