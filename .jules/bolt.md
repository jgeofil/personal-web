## 2025-05-15 - Image Optimization in Grid Components
**Learning:** Adding explicit `width` and `height` attributes to `<img>` tags prevents Layout Shift (CLS) by allowing the browser to reserve space before the image loads. Combining this with `loading="lazy"` improves initial page load performance by deferring off-screen images.
**Action:** Always include image dimensions and consider lazy loading for all non-critical images in Astro components.
