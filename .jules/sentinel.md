## 2024-05-24 - Sensitive Data Exposure in Analytics Tracking
**Vulnerability:** The vitals reporting script (`src/lib/vitals.js`) uses `location.href` to report the current URL, which can inadvertently leak sensitive tokens (like password reset links) or PII stored in query string parameters or hashes.
**Learning:** Third-party analytics and performance reporting scripts should never blindly ingest the full URL.
**Prevention:** Sanitize tracking URLs by using `location.origin + location.pathname` to ensure query parameters and hashes are stripped out before sending the payload.