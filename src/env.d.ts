/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_VERCEL_ANALYTICS_ID: string;
	readonly PUBLIC_STATSIG_CLIENT_KEY: string;
	readonly PUBLIC_GTM_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
