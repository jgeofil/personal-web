## 2026-03-24 - Accessibility improvements for LinkGrid and SocialGrid
**Learning:** Purely decorative images accompanying links must be explicitly hidden from assistive technologies using `alt=""` and `aria-hidden="true"`. The `item.title` property from `src/data/cv.json` should be used to populate `aria-label` attributes for icon-only links.
**Action:** Always verify that decorative images and icon-only links contain the required accessibility attributes in Astro components mapped from dynamic data.
