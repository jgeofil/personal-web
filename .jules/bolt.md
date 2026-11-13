## 2024-03-24 - LCP Image Prioritization
**Learning:** In Astro static sites with eagerly loaded images above the fold, browsers may not prioritize them effectively over other early discovered assets if fetch priority isn't explicitly set, delaying the Largest Contentful Paint (LCP).
**Action:** Always add `fetchpriority="high"` alongside `loading="eager"` to critical LCP images to ensure the browser schedules their download as early as possible.
## 2024-03-24 - LCP Image Prioritization
**Learning:** In Astro static sites with eagerly loaded images above the fold, browsers may not prioritize them effectively over other early discovered assets if fetch priority isn't explicitly set, delaying the Largest Contentful Paint (LCP).
**Action:** Always add `fetchpriority="high"` alongside `loading="eager"` to critical LCP images to ensure the browser schedules their download as early as possible.
## 2024-03-24 - LCP Image Prioritization
**Learning:** In Astro static sites with eagerly loaded images above the fold, browsers may not prioritize them effectively over other early discovered assets if fetch priority isn't explicitly set, delaying the Largest Contentful Paint (LCP).
**Action:** Always add `fetchpriority="high"` alongside `loading="eager"` to critical LCP images to ensure the browser schedules their download as early as possible.
## 2024-03-24 - LCP Image Prioritization
**Learning:** In Astro static sites with eagerly loaded images above the fold, browsers may not prioritize them effectively over other early discovered assets if fetch priority isn't explicitly set, delaying the Largest Contentful Paint (LCP).
**Action:** Always add `fetchpriority="high"` alongside `loading="eager"` to critical LCP images to ensure the browser schedules their download as early as possible.
## 2025-02-13 - Astro define:vars HTML bloat
**Learning:** Using `define:vars` in Astro `<style>` tags for static constants forces Astro to inline CSS variables into the HTML element's `style` attribute on *every single rendered instance* in loops.
**Action:** Replace `define:vars` with hardcoded CSS values or static CSS variables defined in global context when the variable is a constant across all instances, dramatically reducing HTML size and improving render speed.
## 2025-03-01 - URL Sanitization Memoization
**Learning:** In Astro sites, utility functions like `sanitizeUrl` that perform heavy regex and decoding operations are often called repeatedly with the same static inputs (e.g., from CDN bases or JSON data) during rendering, causing significant unnecessary CPU overhead.
**Action:** Implement a memoization pattern (e.g., caching results in a `Map`) for pure utility functions to ensure repeated static inputs are processed in O(1) time, greatly speeding up list and grid rendering.
## 2025-03-01 - Bounded Cache Memory Leak Prevention
**Learning:** When implementing in-memory caches (like a `Map`) for performance optimizations in server-side rendered (SSR) applications or long-lived Node.js processes, an unbounded cache can lead to a memory leak and potential Denial of Service (DoS).
**Action:** Always bound the cache size (e.g., using an LRU cache or a simple eviction strategy like deleting the oldest entry `cache.delete(cache.keys().next().value)`) to ensure the cache does not grow indefinitely.
