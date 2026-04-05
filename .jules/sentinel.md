## 2025-05-15 - Sensitive Data Exposure via Full URL Tracking
**Vulnerability:** The Vercel analytics tracking logic in `src/lib/vitals.js` was capturing the full `location.href`, which included sensitive query parameters (e.g., API tokens, session IDs) and URL fragments.
**Learning:** Using `location.href` for analytics tracking is dangerous as it can inadvertently leak sensitive information contained in the URL to third-party analytics services or log them in backend systems.
**Prevention:** Always sanitize URLs before sending them to analytics by stripping query parameters and hashes. Use `location.origin + location.pathname` to capture only the base URL path.
