## 2024-05-24 - Missing Security Headers in Vercel Deployment
**Vulnerability:** Missing global security headers (X-Frame-Options, Strict-Transport-Security, X-XSS-Protection, etc.) for the Vercel deployment.
**Learning:** Astro projects deployed to Vercel need a `vercel.json` file to define global security headers. Without it, the application lacks defense-in-depth mechanisms against common web vulnerabilities like clickjacking, MIME-type sniffing, and cross-site scripting.
**Prevention:** Always verify the presence of a `vercel.json` file configuring baseline security headers in Vercel-hosted projects.
