/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
