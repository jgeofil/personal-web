## 2026-05-20 - Defense-in-Depth via Permissions-Policy Header
**Vulnerability:** Missing `Permissions-Policy` header allows potential access to sensitive browser features (camera, microphone, geolocation) by malicious scripts or third-party embeds in the event of an XSS attack.
**Learning:** Security headers like `Permissions-Policy` (formerly `Feature-Policy`) provide a crucial secondary layer of defense, restricting browser API access globally even if other application-level mitigations fail, and should be explicitly configured in deployment settings like `vercel.json`.
**Prevention:** Regularly audit and apply modern security headers in deployment configuration files (`vercel.json`, `next.config.js`, etc.) to proactively restrict access to unnecessary but sensitive browser features.
