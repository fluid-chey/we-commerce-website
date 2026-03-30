Apply Fluid brand visuals to an HTML file. This is a project-local version of the /fluid-brand skill adapted for this specific site.

## Arguments

$ARGUMENTS should be a file path to the HTML file to reskin.

## Process

1. Read BRAND.md for all brand rules
2. Read the target file
3. Read styles.css for reference patterns
4. Apply brand treatment in place:

### Color Swap
- All background colors -> `#050505` (or `#111` for alternate sections)
- All text colors -> `#ffffff` (primary), `#f5f0e8` (body), `#888888` (secondary)
- All accent colors -> pick ONE from the brand palette based on content context
- Define `--accent` CSS custom property

### Font Swap
- All font-family declarations -> `'NeueHaas', sans-serif` for headlines/body
- Add `'flfontbold', sans-serif` for any tagline elements
- Add @font-face declarations referencing `assets/fonts/`
- Headlines: weight 900. Body: weight 300-400

### Decorative Treatment
- Add 1-2 brushstroke images from `assets/brushstrokes/` with `mix-blend-mode: screen`, opacity 0.10-0.15
- Position brushstrokes to bleed off edges (negative positioning)
- Add noise/grain overlay via body::after if not present

### Preserve
- ALL layout structure (grid, flexbox, positioning)
- ALL content (text, images, links)
- Section ordering

## Rules
- Edit the file in place using the Edit tool
- Make surgical CSS changes, do not regenerate from scratch
- All asset paths must be relative
- Do not add external dependencies
