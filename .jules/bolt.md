## 2024-05-24 - Dynamic Imports for Third-Party Analytics
**Learning:** Static imports of large third-party libraries (like Statsig) in Astro Layouts prevent Vite from splitting the code, leading to large initial bundles that block rendering, even if the execution is conditional on environment variables.
**Action:** Use `import()` with `Promise.all` for non-critical analytics SDKs. This ensures Vite correctly chunks the libraries and only loads them asynchronously when needed, significantly reducing initial payload size.
