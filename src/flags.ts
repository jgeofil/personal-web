import type { APIContext } from 'astro';
import type { StatsigUser } from '@statsig/vercel-edge';

// A static user object, as was used in the previous implementation.
// In a real application, you would replace this with the current user from the request.
const user: StatsigUser = {
  userID: '1234',
};

export function checkGate(context: APIContext, gateName: string): boolean {
  const statsigClient = context.locals.statsig;

  if (!statsigClient) {
    console.error('Statsig client not found in request context.');
    return false;
  }

  return statsigClient.checkGate(gateName, user);
}
