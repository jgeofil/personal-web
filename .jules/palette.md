## 2025-03-17 - Improve Accessibility for Decorative Images and Icon Links
**Learning:** Icon-only links and purely decorative images in custom Astro components lack out-of-the-box accessibility (like ARIA labels and hidden tags) preventing screen readers from understanding their meaning or purposely ignoring them.
**Action:** Always add `aria-label` dynamically to icon-only links and explicitly hide accompanying decorative images using `alt=""` and `aria-hidden="true"` to improve assistive technology experiences.
