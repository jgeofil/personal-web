## 2026-03-24 - Performance optimizations
**Learning:** Standard performance optimizations for images in Astro components include adding `loading="lazy"`, `width`, and `height` attributes to `<img>` tags.
**Action:** Consistently add `loading="lazy"` to below-the-fold or grid images to improve LCP and initial page load times.

## 2026-03-25 - Prevent Cumulative Layout Shift (CLS) in Astro components
**Learning:** Providing explicit `width` and `height` attributes to `<img>` tags matching their CSS aspect ratio prevents Cumulative Layout Shift (CLS) by allowing the browser to reserve space for the image before it loads.
**Action:** Add explicit `width` and `height` attributes to images whenever their CSS dimensions are known.