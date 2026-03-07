## 2024-06-18 - Optimize Conditional Analytics

**Learning:** Unnecessary analytics scripts like Statsig and Vercel web vitals were being statically imported in Astro layouts, which unnecessarily increases initial bundle sizes and can potentially block rendering.

**Action:** When implementing conditionally loaded third-party scripts (like analytics dependent on environment keys), always use dynamic imports `import()` instead of static top-level imports. This enables optimal code splitting and prevents them from bloating the initial payload.