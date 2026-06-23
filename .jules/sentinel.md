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

## 2024-05-06 - Prevent XSS via Protocol Obfuscation with HTML Entities
**Vulnerability:** The `sanitizeUrl` function in `src/lib/security.js` was removing control characters and checking for obfuscated protocols using `&colon;`, but it didn't decode generic hexadecimal and decimal HTML entities. Attackers could bypass XSS protections using encoded protocols like `&#x6A;avascript:alert(1)`.
**Learning:** Browsers often decode HTML entities within attributes like `href` or `src` before interpreting the URI protocol. Therefore, any URL sanitization logic must properly decode these entities prior to validating the scheme.
**Prevention:** Ensure URL validation decodes standard HTML entities (hexadecimal, decimal, and named) before checking against a blocklist of dangerous protocols.

## 2024-05-20 - Incomplete URL Sanitization
**Vulnerability:** A URL sanitization function validated a URL after decoding entities and stripping control characters, but returned the original, un-decoded, potentially obfuscated string instead of the safe version.
**Learning:** Always return the sanitized version of a string, not the original input. Validating a safe copy while returning the dangerous original bypasses the sanitization effort entirely.
**Prevention:** Ensure functions that manipulate and validate input strings (like removing control characters or decoding HTML entities) return the modified, validated string. Write tests that assert the return value is the expected sanitized string, not just that it blocks known bad inputs.

## 2026-05-20 - Defense-in-Depth via Permissions-Policy Header
**Vulnerability:** Missing `Permissions-Policy` header allows potential access to sensitive browser features (camera, microphone, geolocation) by malicious scripts or third-party embeds in the event of an XSS attack.
**Learning:** Security headers like `Permissions-Policy` (formerly `Feature-Policy`) provide a crucial secondary layer of defense, restricting browser API access globally even if other application-level mitigations fail, and should be explicitly configured in deployment settings like `vercel.json`.
**Prevention:** Regularly audit and apply modern security headers in deployment configuration files (`vercel.json`, `next.config.js`, etc.) to proactively restrict access to unnecessary but sensitive browser features.

## 2026-05-20 - Prevent XSS via URL Encoding Obfuscation
**Vulnerability:** The `sanitizeUrl` function in `src/lib/security.js` prevented XSS by verifying HTML entities and stripping control characters, but failed to URL decode input. Obfuscated malicious protocols, like `%6a%61%76%61%73%63%72%69%70%74%3aalert(1)` (URL encoded `javascript:alert(1)`), could bypass checks since the browser would decode the URL in attributes.
**Learning:** Browsers implicitly URL decode attribute strings. Sanitization layers must iteratively decode standard URL encodings (and double encodings) before comparing the input against protocol blocklists.
**Prevention:** Implement a `do...while` loop utilizing `decodeURIComponent` (safeguarded within a `try...catch`) at the start of sanitization logic. This guarantees all layers of percent-encoding are unraveled prior to evaluating potentially dangerous schemes.

## 2024-05-24 - Content Security Policy missing in headers
**Vulnerability:** The Astro application lacked a `Content-Security-Policy` (CSP) header, which provides an essential layer of defense against Cross-Site Scripting (XSS) and data injection attacks by restricting the sources from which content can be loaded.
**Learning:** While other security headers like `X-Frame-Options` and `Strict-Transport-Security` were properly configured in `vercel.json`, CSP was omitted, likely due to the complexity of configuring it correctly with external resources like Google Tag Manager and analytics tools.
**Prevention:** Always implement a strict CSP when deploying web applications. Even for static sites, modern web functionality often requires external scripts. Ensure that CSP is part of the default security baseline configuration in `vercel.json` and regularly review it as new external services are integrated.
