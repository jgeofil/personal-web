/// <reference types="astro/client-image" />

interface ImportMetaEnv {
	readonly PUBLIC_VERCEL_ANALYTICS_ID: string;
	readonly PUBLIC_STATSIG_CLIENT_KEY: string;
	readonly PUBLIC_GTM_ID: string;
	readonly PUBLIC_POSTHOG_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
