## 2026-03-15 - Dynamic imports for third-party analytics
**Learning:** Statically importing third-party libraries (like Statsig analytics) in Astro layouts increases the initial client payload and blocks rendering.
**Action:** Use dynamic imports (`import()`) for non-critical or conditional third-party libraries to enable code splitting and reduce the initial load.
