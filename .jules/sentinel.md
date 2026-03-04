## 2024-03-04 - [Reverse Tabnabbing Vulnerability]
**Vulnerability:** External links were missing `rel="noopener noreferrer"` attributes.
**Learning:** When external links are opened without `noopener`, the newly opened tab can potentially gain partial access to the `window` object of the opening tab, which can lead to phishing attacks known as reverse tabnabbing.
**Prevention:** Always include `target="_blank" rel="noopener noreferrer"` when linking to external resources.
