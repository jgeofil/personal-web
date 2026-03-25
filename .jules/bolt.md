## 2024-05-24 - Dynamic imports in Astro components
**Learning:** Astro does not correctly split chunks for statically imported scripts conditionally evaluated via environment variables. For non-critical or conditional third-party libraries (like analytics) in Astro layouts, use dynamic imports (`import()`) to enable code splitting, prevent render blocking, and reduce the initial client payload size.
**Action:** Always prefer dynamic `import()` inside `if` blocks for optional scripts rather than top-level static imports in Astro components.
