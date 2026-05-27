## 2026-03-24 - Accessibility improvements for LinkGrid and SocialGrid
**Learning:** Purely decorative images accompanying links must be explicitly hidden from assistive technologies using `alt=""` and `aria-hidden="true"`. The `item.title` property from `src/data/cv.json` should be used to populate `aria-label` attributes for icon-only links.
**Action:** Always verify that decorative images and icon-only links contain the required accessibility attributes in Astro components mapped from dynamic data.

## 2026-03-24 - Screen reader noise from decorative text elements
**Learning:** Purely decorative text elements, such as arrow symbols (`&rarr;`) or decorative spans, are read aloud by screen readers, creating unnecessary noise for users.
**Action:** Always add `aria-hidden="true"` to purely decorative text characters or spans (like in `Card.astro`) to ensure a cleaner and more focused screen reader experience.

## 2024-05-24 - Add tooltip for icon-only links
**Learning:** Icon-only links populated from dynamic data (like in `SocialGrid.astro`) need visual `title` tooltips in addition to `aria-label`s to improve usability for sighted users who may not recognize the icon.
**Action:** Always add a `title` attribute matching the `aria-label` when rendering icon-only links, especially when the link text is not visually present.

## 2024-05-24 - Screen reader context for repeated link text
**Learning:** Using data fields like `item.title` for `aria-label` on social links fails when the title is identical across multiple platforms (e.g., "jgeofil" for GitHub, LinkedIn, and Twitter). Sighted users rely on the visual icons, but screen readers only hear the repeated title.
**Action:** Always include the platform or icon name in the accessible text (e.g., `<span class="sr-only">GitHub: </span>`) to provide necessary context for screen reader users when visual icons are hidden.

## 2024-05-24 - Safari VoiceOver list semantics bug
**Learning:** Safari and VoiceOver remove list semantics from `<ul>` elements when `list-style: none` is applied. This prevents screen reader users from accessing list navigation features (like item counts).
**Action:** Always explicitly add `role="list"` to `<ul>` or `<ol>` elements when using `list-style: none` to ensure list semantics are preserved for all screen readers.

## 2026-05-27 - Skip-to-content links and layout structure
**Learning:** Adding a "skip-to-content" link to `Layout.astro` would be an anti-pattern for this specific app because it lacks a persistent navigation header. Since `<main>` is the first substantive element on the page, a skip link would only create an unnecessary and confusing extra tab stop for keyboard users.
**Action:** Do not blindly add skip links to all layouts; verify that there is actually repeated content to skip over.

## 2026-05-27 - Clickable area for link icons
**Learning:** In components like `LinkGrid.astro`, placing visual icons outside of the adjacent text's `<a>` tag causes confusing "dead clicks" when users intuitively click the icon to navigate. It also causes the icon to be excluded from keyboard focus rings.
**Action:** Always wrap companion icons inside the anchor tag they represent, using CSS `inline-flex` for vertical alignment, matching the established correct pattern in `SocialGrid.astro`.
