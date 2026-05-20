## 2026-03-24 - Performance optimizations
**Learning:** Standard performance optimizations for images in Astro components include adding `loading="lazy"`, `width`, and `height` attributes to `<img>` tags.
**Action:** Consistently add `loading="lazy"` to below-the-fold or grid images to improve LCP and initial page load times.

## 2026-03-25 - Prevent Cumulative Layout Shift (CLS) in Astro components
**Learning:** Providing explicit `width` and `height` attributes to `<img>` tags matching their CSS aspect ratio prevents Cumulative Layout Shift (CLS) by allowing the browser to reserve space for the image before it loads.
**Action:** Add explicit `width` and `height` attributes to images whenever their CSS dimensions are known.

## 2024-05-24 - Hoisting Static Objects
**Learning:** Hoisting static objects from functions avoids redundant re-instantiation during rendering loops, leading to performance improvements.
**Action:** Centralize static objects in utility modules to avoid redundant creation.

## 2024-05-24 - Defer third-party scripts to improve Total Blocking Time (TBT)
**Learning:** Third-party analytics scripts like PostHog, Statsig, and Vercel Analytics can significantly impact initial load performance and increase Total Blocking Time (TBT) if loaded and executed immediately on the main thread.
**Action:** Wrap the dynamic import and initialization logic for these third-party scripts in `requestIdleCallback` (with a `setTimeout` fallback). Also, use `<link rel="preconnect" href="<API_HOST>" />` in the `<head>` to reduce network connection latency.

## 2026-05-20 - Remove Stale Comments
**Learning:** Outdated or completed "Optimize:" comments can clutter the codebase and reduce maintainability.
**Action:** When working on code health, ensure comments accurately reflect the current state of the code and remove those that point to optimizations already implemented.
## 2026-05-20 - Optimize object iteration
**Learning:** Using a `for...in` loop is significantly faster than `Object.entries().reduce()` for simple object iteration and string replacements, avoiding array allocations and callback overhead.
**Action:** Prefer `for...in` loops over `Object.entries().reduce()` in performance-critical paths, such as analytics reporting loops.
