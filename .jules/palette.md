## 2026-03-24 - Accessibility improvements for LinkGrid and SocialGrid
**Learning:** Purely decorative images accompanying links must be explicitly hidden from assistive technologies using `alt=""` and `aria-hidden="true"`. The `item.title` property from `src/data/cv.json` should be used to populate `aria-label` attributes for icon-only links.
**Action:** Always verify that decorative images and icon-only links contain the required accessibility attributes in Astro components mapped from dynamic data.

## 2026-03-24 - Screen reader noise from decorative text elements
**Learning:** Purely decorative text elements, such as arrow symbols (`&rarr;`) or decorative spans, are read aloud by screen readers, creating unnecessary noise for users.
**Action:** Always add `aria-hidden="true"` to purely decorative text characters or spans (like in `Card.astro`) to ensure a cleaner and more focused screen reader experience.
