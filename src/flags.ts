import { StatsigClient, type StatsigUser } from '@statsig/js-client';
import.meta.env

const statsigClient = new StatsigClient(
   env.STATSIG_KEY, // your client key
  {
    userID: '1234', // a user to identify
  },
);

export async function checkGate(gateName: string): Promise<boolean> {
  await statsigClient.initializeAsync();
  return statsigClient.checkGate(gateName);
}
