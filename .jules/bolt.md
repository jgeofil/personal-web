## 2024-03-17 - Astro Static vs Dynamic Imports for Analytics
**Learning:** Astro does not split chunks correctly for statically imported scripts conditionally evaluated via environment variables. This causes non-critical libraries to block rendering and increase initial bundle size.
**Action:** Use dynamic imports (e.g., `Promise.all([import()])`) for non-critical or conditional third-party libraries in Astro layouts to enable proper code splitting.
