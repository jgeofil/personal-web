## 2026-03-24 - Add rel="noopener noreferrer" and sanitize URLs
**Vulnerability:** External links created from dynamic, user-controlled data can lead to Cross-Site Scripting (XSS) via `javascript:` URIs, and missing `rel="noopener noreferrer"` causes reverse tabnabbing vulnerability.
**Learning:** Components mapping dynamic data from `src/data/cv.json` to link attributes are required to sanitize URLs using the `sanitizeUrl` utility. External links should always use `target="_blank" rel="noopener noreferrer"`.
**Prevention:** Implement and use a `sanitizeUrl` utility. Ensure new external link templates explicitly define `target="_blank" rel="noopener noreferrer"`.
