## 2026-03-24 - Add rel="noopener noreferrer" and sanitize URLs
**Vulnerability:** External links created from dynamic, user-controlled data can lead to Cross-Site Scripting (XSS) via `javascript:` URIs, and missing `rel="noopener noreferrer"` causes reverse tabnabbing vulnerability.
**Learning:** Components mapping dynamic data from `src/data/cv.json` to link attributes are required to sanitize URLs using the `sanitizeUrl` utility. External links should always use `target="_blank" rel="noopener noreferrer"`.
**Prevention:** Implement and use a `sanitizeUrl` utility. Ensure new external link templates explicitly define `target="_blank" rel="noopener noreferrer"`.
## 2026-03-25 - Prevent Sensitive Data Exposure in Analytics URLs
**Vulnerability:** The web vitals reporting logic in `src/lib/vitals.js` was reading the raw `location.href` value and directly appending it to the analytics payload sent to Vercel Analytics. This raw `href` could contain sensitive information like query parameters or URL fragment hashes.
**Learning:** Sending unsanitized URLs directly to external analytics platforms exposes Personally Identifiable Information (PII) or sensitive tokens (e.g., reset tokens, auth tokens) implicitly passed by tracking codes or backend services.
**Prevention:** In analytics endpoints, avoid tracking `location.href` directly. Strip query parameters and hashes from the request payload by logging only `location.origin + location.pathname` to ensure strict analytics hygiene.

## 2026-03-31 - Replace Hardcoded Google Tag Manager ID
**Vulnerability:** Hardcoded GTM ID in Layout component.
**Learning:** Hardcoding third-party service identifiers limits configurability and can expose internal tracking IDs in source control.
**Prevention:** Use environment variables for all third-party service IDs and API keys to ensure environment-specific configuration and keep identifiers out of the codebase.
## 2024-05-24 - XSS Bypass in URL Sanitizer via Control Characters
**Vulnerability:** The `sanitizeUrl` function in `src/lib/security.js` relies on `URL` parsing to block `javascript:` URIs. However, `URL` throws on invalid URLs such as `"java script:alert(1)"` or `"j\u0000avascript:alert(1)"` because of unescaped whitespace or control characters. In the `catch` block, it then checks `!url.includes('://')` and returns the URL as-is, treating it as a safe relative URL. Browsers ignore these characters and still execute the XSS payload.
**Learning:** Checking for safe URLs with a fallback `!url.includes('://')` for "relative URLs" is extremely dangerous because invalid (yet executable) `javascript:` URLs will fall back to this relative URL check and bypass the protection.
**Prevention:** Before falling back or parsing, strip whitespace and control characters `[\x00-\x20]` and use `.startsWith()` to explicitly block `javascript:`, `vbscript:`, and `data:` protocols, regardless of whether the URL parses cleanly or not.
