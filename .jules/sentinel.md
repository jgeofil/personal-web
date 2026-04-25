## 2026-03-25 - Prevent Sensitive Data Exposure in Analytics URLs
**Vulnerability:** The web vitals reporting logic in `src/lib/vitals.js` was reading the raw `location.href` value and directly appending it to the analytics payload sent to Vercel Analytics. This raw `href` could contain sensitive information like query parameters or URL fragment hashes.
**Learning:** Sending unsanitized URLs directly to external analytics platforms exposes Personally Identifiable Information (PII) or sensitive tokens (e.g., reset tokens, auth tokens) implicitly passed by tracking codes or backend services.
**Prevention:** In analytics endpoints, avoid tracking `location.href` directly. Strip query parameters and hashes from the request payload by logging only `location.origin + location.pathname` to ensure strict analytics hygiene.

## 2026-04-08 - Prevent XSS in Reusable Astro Link Components
**Vulnerability:** The `<Card />` Astro component accepted an `href` prop and outputted it directly into an anchor tag without sanitization. This allowed the potential for Cross-Site Scripting (XSS) if malicious URLs (like `javascript:alert(1)`) were passed to the component.
**Learning:** Even static components that render links from props can be vectors for XSS if those props can be controlled by external data or unsanitized user input in the future.
**Prevention:** Always sanitize URLs using a robust utility (e.g., `sanitizeUrl` to strip dangerous protocols like `javascript:`, `data:`, etc.) before rendering them into `href` attributes in UI components.

## 2026-04-15 - Sandbox External Iframes
**Vulnerability:** The iframe embedding a Google Doc in `src/pages/privacy.astro` lacked a `sandbox` attribute, potentially allowing the embedded content to execute malicious scripts or navigate the top-level browsing context.
**Learning:** Iframes embedding external content must use the `sandbox` attribute to minimize security risks.
**Prevention:** Always add a `sandbox` attribute (e.g., `sandbox="allow-scripts allow-same-origin"`) to `<iframe>` elements loading external resources.
