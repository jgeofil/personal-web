## 2024-05-24 - Astro Chunk Splitting for Conditional Imports
**Learning:** Astro does not split chunks correctly for statically imported scripts conditionally evaluated via environment variables. This leads to bloated initial payloads even when the condition evaluates to false.
**Action:** Use dynamic imports (e.g., `Promise.all([import()])`) for non-critical or conditional third-party libraries (like Statsig analytics) in Astro layouts to enable code splitting, prevent render blocking, and reduce the initial client payload size.
