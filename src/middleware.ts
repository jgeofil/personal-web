import { defineMiddleware } from 'astro:middleware';
import { StatsigVercelClient } from '@statsig/vercel-edge';
import { waitUntil } from '@vercel/functions';

// Instantiate the client outside the handler to take advantage of warm starts
let client: StatsigVercelClient | null = null;

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  if (!client) {
    client = new StatsigVercelClient(
      import.meta.env.STATSIG_KEY,
    );
  }

  // initializeFromEdgeConfig is fast but we still await it to ensure we have the latest specs
  // The SDK internally handles caching of the specs.
  await client.initializeFromEdgeConfig(
    import.meta.env.EDGE_CONFIG_KEY,
  );

  locals.statsig = client;

  const response = await next();

  // ensure events are flushed
  waitUntil(client.flush());

  return response;
});
