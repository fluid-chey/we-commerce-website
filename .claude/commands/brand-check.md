Audit the We-Commerce website for brand compliance. Read BRAND.md first, then read styles.css and index.html. Check for violations against these rules:

## Checks to perform

1. **Font compliance**: Grep styles.css and index.html for any font-family declarations. Flag anything that isn't `'NeueHaas'`, `'flfontbold'`, `'Inter'`, or `sans-serif`. Flag any use of Syne, DM Sans, Space Mono, Space Grotesk, Roboto, Arial, cursive, Georgia, Times New Roman, or serif.

2. **Color compliance**: Grep for hex colors and rgb/rgba values in styles.css. Flag any hex colors that aren't in the brand palette: `#050505`, `#111`, `#161616`, `#ffffff`, `#f5f0e8`, `#888888`, `#42b1ff`, `#FF8B58`, `#44b574`, `#c985e5`, `#000`, `#000000`, or the flywheel segment colors (`#8AC8AE`, `#82CC9A`, `#F2D270`, `#F0B088`, `#E09098`, `#C4A8D4`, `#96C4EC`). Ignore rgba values using `255,255,255` or `0,0,0` bases as those are opacity variations of approved colors. Also ignore `#1a1a1a`, `#2a2a2a` (browser chrome component), `#0a0a0a`, `#ff5f57`, `#febc2e`, `#28c840` (macOS dots).

3. **Brushstroke blend mode**: Grep for `.brushstroke` and any `mix-blend-mode` declarations. Every brushstroke must use `mix-blend-mode: screen`.

4. **CSS variable usage**: Check if raw hex values are used where CSS variables exist (e.g., `#42b1ff` instead of `var(--blue)`).

5. **Noise overlay**: Verify body::after exists with the grain/noise SVG texture.

6. **Asset paths**: Grep for any absolute paths (`/assets/`) — all should be relative (`assets/`).

## Output format

Print a summary:
- PASS items (brief)
- FAIL items with file, line reference, and what's wrong
- Suggestions for fixes

If $ARGUMENTS contains a file path, only check that specific file. Otherwise check all HTML and CSS files.
