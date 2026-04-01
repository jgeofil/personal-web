## 2026-03-24 - Add rel="noopener noreferrer" and sanitize URLs
**Vulnerability:** External links created from dynamic, user-controlled data can lead to Cross-Site Scripting (XSS) via `javascript:` URIs, and missing `rel="noopener noreferrer"` causes reverse tabnabbing vulnerability.
**Learning:** Components mapping dynamic data from `src/data/cv.json` to link attributes are required to sanitize URLs using the `sanitizeUrl` utility. External links should always use `target="_blank" rel="noopener noreferrer"`.
**Prevention:** Implement and use a `sanitizeUrl` utility. Ensure new external link templates explicitly define `target="_blank" rel="noopener noreferrer"`.
## 2026-03-25 - Prevent Sensitive Data Exposure in Analytics URLs
**Vulnerability:** The web vitals reporting logic in `src/lib/vitals.js` was reading the raw `location.href` value and directly appending it to the analytics payload sent to Vercel Analytics. This raw `href` could contain sensitive information like query parameters or URL fragment hashes.
**Learning:** Sending unsanitized URLs directly to external analytics platforms exposes Personally Identifiable Information (PII) or sensitive tokens (e.g., reset tokens, auth tokens) implicitly passed by tracking codes or backend services.
**Prevention:** In analytics endpoints, avoid tracking `location.href` directly. Strip query parameters and hashes from the request payload by logging only `location.origin + location.pathname` to ensure strict analytics hygiene.
