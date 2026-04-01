/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_VERCEL_ANALYTICS_ID: string;
	readonly PUBLIC_STATSIG_CLIENT_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
