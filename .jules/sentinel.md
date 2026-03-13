## 2024-05-18 - Global Security Headers for Vercel Deployments
**Vulnerability:** Missing global security headers (e.g., Strict-Transport-Security, X-Frame-Options, X-XSS-Protection) leaving the application vulnerable to clickjacking, MITM attacks, and XSS.
**Learning:** In Astro applications deployed on Vercel, global security headers cannot easily be set via Astro's standard configuration alone for static and SSR routes combined without middleware. Vercel provides a specific mechanism for this.
**Prevention:** Always ensure a `vercel.json` file is present in the project root containing a `headers` array that applies essential security headers to all routes (`/(.*)`).
