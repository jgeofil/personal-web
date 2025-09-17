import { StatsigClient, type StatsigUser } from '@statsig/js-client';

const statsigClient = new StatsigClient(
  'client-wRnwtY1g3LULwkE8kyYuLOjqa9Am2kcAEKq4s4tzNS9', // your client key
  {
    userID: '1234', // a user to identify
  },
);

export async function checkGate(gateName: string): Promise<boolean> {
  await statsigClient.initializeAsync();
  return statsigClient.checkGate(gateName);
}
