## 2024-05-24 - Image Attribute Optimization
**Learning:** Missing `loading="lazy"`, `width`, and `height` attributes on external images can lead to unoptimized loading and Cumulative Layout Shifts (CLS), impacting Web Vitals.
**Action:** Always include lazy loading and explicit dimensions (e.g., width="48" height="48") on images mapping dynamic content to ensure stable layouts and improved LCP.
