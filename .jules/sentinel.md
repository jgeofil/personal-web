## 2026-03-25 - Prevent Sensitive Data Exposure in Analytics URLs
**Vulnerability:** The web vitals reporting logic in `src/lib/vitals.js` was reading the raw `location.href` value and directly appending it to the analytics payload sent to Vercel Analytics. This raw `href` could contain sensitive information like query parameters or URL fragment hashes.
**Learning:** Sending unsanitized URLs directly to external analytics platforms exposes Personally Identifiable Information (PII) or sensitive tokens (e.g., reset tokens, auth tokens) implicitly passed by tracking codes or backend services.
**Prevention:** In analytics endpoints, avoid tracking `location.href` directly. Strip query parameters and hashes from the request payload by logging only `location.origin + location.pathname` to ensure strict analytics hygiene.

## 2026-03-31 - Replace Hardcoded Google Tag Manager ID
**Vulnerability:** Hardcoded GTM ID in Layout component.
**Learning:** Hardcoding third-party service identifiers limits configurability and can expose internal tracking IDs in source control.
**Prevention:** Use environment variables for all third-party service IDs and API keys to ensure environment-specific configuration and keep identifiers out of the codebase.
