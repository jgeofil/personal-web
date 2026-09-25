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
