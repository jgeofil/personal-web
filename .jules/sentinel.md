## 2024-05-24 - [Security Header Enhancement]
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Content-Security-Policy).
**Learning:** Astro provides an easy way to add custom headers globally across the application, especially when using an adapter like Vercel which we can configure via `vercel.json`.
**Prevention:** Ensure security headers are included in deployment configurations to protect against common web vulnerabilities.
