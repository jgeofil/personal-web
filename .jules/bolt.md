## 2024-05-18 - [Dynamic Imports in Astro Layouts]
**Learning:** [Astro does not split chunks correctly for statically imported third party scripts that are conditionally evaluated based on an environment variable using if/else]
**Action:** [Use dynamic imports using `Promise.all` + `import` to correctly split out these chunks from the client payload size to prevent render blocking]
