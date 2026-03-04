## 2024-05-14 - Improve accessibility of icon-only links
**Learning:** In Astro components that loop over JSON data to create social grids or link lists, icon-only `<a>` elements frequently lack `aria-label` attributes, making them inaccessible to screen readers. Furthermore, the accompanying decorative `<img>` tags often lack empty `alt` and `aria-hidden="true"` attributes, causing redundant or confusing announcements.
**Action:** Always add dynamic `aria-label` attributes based on the data item's name or icon, and explicitly hide decorative images from assistive technologies.
