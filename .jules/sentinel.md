## 2024-03-22 - Prevent Sensitive Data Exposure in Analytics URLs
**Vulnerability:** The web vitals analytics tracked `location.href`, which includes query parameters and hash fragments. These can contain sensitive data like PII, session tokens, or temporary passwords (e.g., from password reset links).
**Learning:** Analytics scripts that blindly capture full URLs can inadvertently exfiltrate sensitive data.
**Prevention:** Always sanitize URLs before sending them to third-party analytics by using `location.origin + location.pathname` to explicitly strip search parameters and hashes.