## 2024-05-28 - Dynamic Imports for Analytics
**Learning:** Loading analytics libraries synchronously in the head can block rendering and increase bundle size significantly.
**Action:** Use dynamic imports `import(...)` for non-critical analytics libraries like Statsig to reduce the initial load time and bundle size.
