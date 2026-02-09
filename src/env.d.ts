/// <reference types="astro/client-image" />

declare namespace App {
  interface Locals {
    statsig: import('@statsig/vercel-edge').StatsigVercelClient;
  }
}

interface ImportMetaEnv {
	readonly PUBLIC_VERCEL_ANALYTICS_ID: string;
	readonly STATSIG_KEY: string;
	readonly EDGE_CONFIG_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
