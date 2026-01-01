import { defineMiddleware } from 'astro:middleware';
import { StatsigVercelClient } from '@statsig/vercel-edge';
import { waitUntil } from '@vercel/functions';

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  const client = new StatsigVercelClient(
    import.meta.env.STATSIG_KEY,
  );

  await client.initializeFromEdgeConfig(
    import.meta.env.EDGE_CONFIG_KEY,
  );

  locals.statsig = client;

  const response = await next();

  waitUntil(client.flush());

  return response;
});
