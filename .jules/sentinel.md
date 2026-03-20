## 2026-03-20 - Sensitive Data Exposure in Analytics Tracking
**Vulnerability:** The analytics tracking code in `src/lib/vitals.js` was using `location.href` directly to capture the page URL.
**Learning:** This exposes the entire URL, including potentially sensitive query parameters (like PII, tokens, session IDs) and hash fragments to third-party analytics services, creating a high-risk data leakage scenario.
**Prevention:** Always sanitize URLs before sending them to third-party services. Use `location.origin + location.pathname` to ensure query parameters and hashes are stripped from tracked analytics data.
