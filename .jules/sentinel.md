## 2026-03-25 - Prevent Sensitive Data Exposure in Analytics URLs
**Vulnerability:** The web vitals reporting logic in `src/lib/vitals.js` was reading the raw `location.href` value and directly appending it to the analytics payload sent to Vercel Analytics. This raw `href` could contain sensitive information like query parameters or URL fragment hashes.
**Learning:** Sending unsanitized URLs directly to external analytics platforms exposes Personally Identifiable Information (PII) or sensitive tokens (e.g., reset tokens, auth tokens) implicitly passed by tracking codes or backend services.
**Prevention:** In analytics endpoints, avoid tracking `location.href` directly. Strip query parameters and hashes from the request payload by logging only `location.origin + location.pathname` to ensure strict analytics hygiene.

## 2026-04-08 - Prevent XSS in Reusable Astro Link Components
**Vulnerability:** The `<Card />` Astro component accepted an `href` prop and outputted it directly into an anchor tag without sanitization. This allowed the potential for Cross-Site Scripting (XSS) if malicious URLs (like `javascript:alert(1)`) were passed to the component.
**Learning:** Even static components that render links from props can be vectors for XSS if those props can be controlled by external data or unsanitized user input in the future.
**Prevention:** Always sanitize URLs using a robust utility (e.g., `sanitizeUrl` to strip dangerous protocols like `javascript:`, `data:`, etc.) before rendering them into `href` attributes in UI components.

## 2026-04-21 - Restrict Iframe Capabilities with Sandbox Attribute
**Vulnerability:** The iframe in `src/pages/privacy.astro` used to embed a Google Doc was missing a `sandbox` attribute.
**Learning:** Iframes without a `sandbox` attribute have full access to browser features (within the same-origin policy), which can be exploited if the embedded content is compromised or malicious.
**Prevention:** Always apply a `sandbox` attribute to iframes, specifying only the minimum required permissions (e.g., `allow-scripts allow-same-origin`) to reduce the attack surface.
