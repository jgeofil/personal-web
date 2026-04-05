## 2025-05-15 - Optimize Array Reduction for Vitals

**Learning:** Replacing functional patterns like `Object.entries().reduce()` with imperative `for` loops and `Object.keys()` provides a significant performance boost (~1.8x) by avoiding intermediate array allocations and callback overhead in performance-critical code paths.

**Action:** Use `for` loops over `Object.keys()` for hot path object iterations, especially when working with small to medium-sized objects in a browser environment.
