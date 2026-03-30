Scaffold a new section for the We-Commerce website. Read BRAND.md first for all brand rules.

## Arguments

$ARGUMENTS should describe the section purpose (e.g., "pricing table", "team grid", "FAQ accordion").

## Process

1. Read BRAND.md for brand rules
2. Read styles.css for existing patterns and class naming conventions
3. Read index.html to understand the current section structure and where the new section should go
4. Read main.js to understand existing JS patterns

## Section Template

Every new section follows this pattern:

```html
<section class="section {name}" id="{name}">
  <div class="container">
    <div class="{name}__grid reveal">
      <!-- Section content -->
    </div>
  </div>
</section>
```

## Rules

- Use BEM-style class naming consistent with existing code (e.g., `.pricing__grid`, `.pricing__card`)
- All typography must use the existing classes (`.headline`, `.label`, `.body-text`, etc.) or follow the same font system
- Colors come from CSS variables only (`var(--blue)`, `var(--bg-card)`, etc.)
- Add the `.reveal` class to the main content wrapper for scroll animation
- Section padding uses `var(--section-pad)`
- Container uses `var(--content-max)` and matching horizontal padding
- Add responsive breakpoints in the existing media query blocks (768px, 480px)
- Add CSS to `styles.css` — do not use inline styles except for one-off color assignments
- If JS interactivity is needed, add to `main.js` following existing patterns (IntersectionObserver, classList toggling)
- Do not add any external dependencies

## Placement

Insert the new section HTML in index.html at the logical position (ask if unsure). Add CSS at the end of the component sections in styles.css (before the responsive block). Add JS at the end of main.js before the DOMContentLoaded block if needed.
