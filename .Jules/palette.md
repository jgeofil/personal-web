## 2024-05-14 - Icon-only Links and Decorative Images
**Learning:** Icon-only links (like social icons) often lack context for screen readers if not labeled. Decorative images within links or next to them should be hidden to avoid screen readers reading both the link and the image.
**Action:** Use `aria-label` dynamically for icon-only links based on the context. Ensure any internal/decorative `<img>` has `alt=""` and `aria-hidden="true"`.
