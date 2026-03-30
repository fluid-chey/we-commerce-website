# We-Commerce Website — Brand & Agent Rules

> **Single source of truth.** This file is symlinked as `CLAUDE.md` (Claude Code) and `.cursorrules` (Cursor). All AI agents working in this project MUST follow these rules exactly.

---

## Project Overview

This is the **Fluid We-Commerce marketing website** — a dark, premium landing page for Fluid's direct-selling e-commerce platform. It is a static site: `index.html` + `styles.css` + `main.js`. No framework, no build step.

---

## Font System (MANDATORY)

Three fonts. No exceptions. No substitutions.

| Role | CSS `font-family` | File | Weight |
|------|-------------------|------|--------|
| **Taglines & emphasis** | `'flfontbold', sans-serif` | `assets/fonts/flfontbold.ttf` | normal |
| **Headlines** | `'NeueHaas', sans-serif` | `assets/fonts/Inter-VariableFont.ttf` (proxy) | 900 |
| **Body copy** | `'NeueHaas', sans-serif` | `assets/fonts/Inter-VariableFont.ttf` | 300-400 |

### Hard Rules

- **NEVER** use Syne, DM Sans, Space Mono, Space Grotesk, Roboto, Arial, Inter (as a named family), or any other font.
- **NEVER** use `cursive`, `Georgia`, `Times New Roman`, or `serif` as a fallback. The ONLY generic fallback is `sans-serif`.
- `flfontbold` is for taglines ONLY. Never headlines, never body text.
- Taglines use sentence case (NOT uppercase). Color = the section's accent color.

### @font-face Declarations (copy exactly)

```css
@font-face {
  font-family: 'NeueHaas';
  src: url('assets/fonts/Inter-VariableFont.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'flfontbold';
  src: url('assets/fonts/flfontbold.ttf') format('truetype');
  font-weight: normal;
  font-display: swap;
}
```

---

## Color Palette (MANDATORY)

### Accent Colors

One accent color per section/context. Pick from this fixed set:

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#FF8B58` | Urgency, pain, warning, CTAs |
| Blue | `#42b1ff` | Technical, intelligence, trust, links |
| Green | `#44b574` | Success, solution, proof |
| Purple | `#c985e5` | Premium, financial, analytical |

### Neutrals

| Color | Hex | Usage |
|-------|-----|-------|
| Near-black | `#050505` | Page background (`--bg`) |
| Section bg | `#111` | Alternate section background (`--bg-section`) |
| Card bg | `#161616` | Card/panel background (`--bg-card`) |
| White | `#ffffff` | Primary text (`--text-primary`) |
| Warm white | `#f5f0e8` | Body text (`--text-body`) |
| Secondary | `#888888` | Supporting text (`--text-secondary`) |

### Flywheel Segment Colors

These are used ONLY for the flywheel product sections:

```
--seg-checkout:  #8AC8AE
--seg-payments:  #82CC9A
--seg-fairshare: #F2D270
--seg-connect:   #F0B088
--seg-app:       #E09098
--seg-builder:   #C4A8D4
--seg-droplets:  #96C4EC
```

### Hard Rules

- **NEVER** introduce new colors outside this palette.
- **NEVER** use bright/saturated blues, reds, or other hues not listed above.
- Borders and dividers: `rgba(255,255,255,0.06)` to `rgba(255,255,255,0.15)`.

---

## CSS Custom Properties (use these)

```css
:root {
  --blue: #42b1ff;
  --orange: #FF8B58;
  --green: #44b574;
  --purple: #c985e5;
  --bg: #050505;
  --bg-section: #111;
  --bg-card: #161616;
  --text-primary: #ffffff;
  --text-body: #f5f0e8;
  --text-secondary: #888888;
  --section-pad: clamp(80px, 10vw, 140px);
  --content-max: 1280px;
}
```

Always reference CSS variables, not raw hex values, when the variable exists.

---

## Typography Scale

| Class | Weight | Size | Extra |
|-------|--------|------|-------|
| `.headline-lg` | 900 | `clamp(44px, 6vw, 72px)` | uppercase, `letter-spacing: -0.02em`, `line-height: 1.05` |
| `.headline` | 900 | `clamp(36px, 5vw, 64px)` | uppercase, `letter-spacing: -0.02em`, `line-height: 1.08` |
| `.label` | 500 | `12px` | uppercase, `letter-spacing: 0.14em`, colored by section accent |
| `.tagline` | normal | contextual | `flfontbold`, accent color, sentence case |
| `.body-text` | 300 | `clamp(16px, 1.25vw, 20px)` | `--text-body`, `line-height: 1.65` |
| `.body-text-sm` | 400 | `14px` | `--text-secondary`, `line-height: 1.55` |

---

## Decorative Elements

### Brushstrokes

- Assets: `assets/brushstrokes/brush-texture-01.png` through `brush-texture-10.png`, plus `brush-white.png`
- **ALWAYS** use `mix-blend-mode: screen`
- Opacity: `0.10` to `0.25` (subtle: 0.10-0.15, dramatic: 0.20-0.25)
- Edges must bleed off canvas (use negative positioning)
- Slight rotation for organic feel

```css
.brushstroke {
  position: absolute;
  mix-blend-mode: screen;
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}
```

### Grain/Noise Overlay

The `body::after` pseudo-element applies a fixed SVG noise texture at `opacity: 0.025` over the entire page. Do not remove or duplicate this.

### Circle/Underline Emphasis (if adding)

- Use white PNG masks via CSS `mask-image` with a colored `background-color`
- Circle assets: `circle-1` through `circle-6`
- Underline assets: `underline-1` through `underline-3`
- Must wrap a specific word — never floating or purely decorative

---

## Component Patterns

### Buttons

| Class | Style |
|-------|-------|
| `.btn-primary` | Pill shape (`border-radius: 100px`), `--blue` bg, dark text, hover lifts + glow |
| `.btn-secondary` | Pill shape, transparent bg, subtle white border, no fill |
| `.btn-text` | Text only, hover fades opacity |

### Browser Chrome Frame

Used to showcase product screenshots. Structure: `.browser-chrome` > `__bar` (dots + tab) > `__addr` > `__body` (img/video).

### Phone Mockup

Used for mobile app showcase. Structure: `.phone-mockup` > `__frame` (rounded dark shell) > `__screen` (content area with notch).

### Cards

- Background: `rgba(255,255,255,0.04)` to `rgba(255,255,255,0.06)`
- Border: `1px solid rgba(255,255,255,0.06)` to `rgba(255,255,255,0.08)`
- Border-radius: `10px` to `14px`

---

## Layout Rules

- Max content width: `1280px` (via `--content-max`)
- Section padding: `clamp(80px, 10vw, 140px)` vertical
- Container horizontal padding: `clamp(24px, 4vw, 64px)`
- Two-column grids collapse to single column at `768px`
- Nav fixed at top, 68px height, blurs on scroll

---

## Animation Patterns

- **Scroll reveal**: `.reveal` class, observed via IntersectionObserver. Starts `opacity: 0; translateY(30px)`, transitions to visible.
- **Marquee**: Trust strip logos scroll left infinitely.
- **Drift**: Hero data cards float with CSS `@keyframes drift`.
- **Transitions**: Use `cubic-bezier(0.16, 1, 0.3, 1)` for reveals. Standard `ease` for hovers (0.2-0.3s).

---

## Asset Inventory

```
assets/
  fonts/
    flfontbold.ttf
    Inter-VariableFont.ttf
  brushstrokes/
    brush-texture-01.png ... brush-texture-10.png
    brush-white.png
  logos/
    fluid-logo.png, fluid-logo.svg
    wecommerce-logos.png, wecommerce-logo.svg, wecommerce-logo-t2.svg
    wecommerce-flags.png, wc-flag.png
    flag-icon.svg, flag-icon-t2.svg
    frame-3-fluid-dots.png
    wecommerce-built.png
    [client logos: thermomix, asea, yoli, rain, newulife, make, teqnavi]
  icons/
    icon-attribution.png, icon-builder.png, icon-global-payments.png
    icon-one-click-checkout.png, icon-performance.png
    icon-real-time-visibility.png, icon-shop.png, icon-templates.png
    icon-bi-directional-sync.png
  images/
    commerce-broken-dark.png
    screen-*.png/mp4 (product screenshots)
    [testimonial headshots: mike-kendall.jpg, holly-mckinney.jpg, felipe-lee.jpg]
```

Reference assets with relative paths (e.g., `assets/fonts/flfontbold.ttf`).

---

## Photo Style (for any new imagery)

- Warm vintage film look (Kodak Portra 400 emulation)
- Muted desaturated colors with warm amber-golden tones
- Soft natural light, no flash, shallow depth of field
- Lifted milky shadows, subtle film grain
- Candid diverse people using phones in casual lifestyle settings
- Earth-toned wardrobe: cream, beige, olive, rust, sage
- **NEVER**: saturated/neon colors, studio lighting, corporate settings, HDR, stock photo aesthetic

---

## Voice & Copy Rules

- Problem before solution. Name what's broken first.
- Short sentences. Declarative. No hedging.
- Say "you" (the company) and "we" (Fluid). Direct address.
- Present tense, active voice.
- **Banned words**: industry-leading, best-in-class, game-changing, revolutionary, innovative, seamless, solutions, leverage, robust, empower, utilize, synergy.
- Prefer: people, trust, credit, effort, share/sharing, relationship, the system, fix, confidence.

---

## What NOT To Do

1. **Do not add new fonts.** The font system is closed.
2. **Do not add new colors.** The palette is closed.
3. **Do not add frameworks or build tools.** This is vanilla HTML/CSS/JS.
4. **Do not use Tailwind classes.** This project uses custom CSS.
5. **Do not restructure the HTML hierarchy** without explicit approval.
6. **Do not remove the noise/grain overlay.**
7. **Do not change brushstroke blend mode** from `screen`.
8. **Do not use inline styles** for anything that can be a CSS class (existing inline styles for one-off positioning are acceptable).
9. **Do not introduce JavaScript dependencies.** Keep it vanilla.
10. **Do not change existing copy** unless specifically asked — voice and messaging are carefully authored.

---

## JavaScript Behavior (main.js)

All interactivity is vanilla JS, no dependencies. Key systems:

| System | Trigger | Behavior |
|--------|---------|----------|
| **Scroll reveal** | `.reveal` elements entering viewport | Adds `.visible` class (opacity 0->1, translateY 30->0). One-shot via IntersectionObserver. |
| **Nav blur** | Scroll > 100px | Adds `.scrolled` class to `.nav` (backdrop-filter blur). |
| **Mobile menu** | `.nav__hamburger` click | Toggles `.open` on `.nav__mobile-menu`. |
| **Testimonial carousel** | Auto (5s interval) + dot clicks | Rotates `.testimonial-card.active`. Pauses on hover. |
| **Flywheel** | Scroll position within `.solution-scroll` | Rotates SVG wheel, swaps `.flywheel-card.active`, updates dots. Also responds to SVG segment clicks. |
| **Catchup cards** | Phone mockup entering viewport | Staggers `.visible` class on `.catchup-card` elements (300ms delay each). |
| **Stat counter** | Stats grid entering viewport | Animates `data-count` numbers from 0 to target over ~1.2s. |

### Flywheel Data Model

The flywheel has 7 segments defined in the `segments` array in main.js. Each segment has:
- `name` — product name (Checkout, Payments, FairShare, Connect, App, Builder, Droplets)
- `color` — matches `--seg-*` CSS variables
- `tagline` — short description
- `media` / `mediaType` — screenshot path(s) and type (image/video/phones)
- `chrome` — whether to wrap in browser chrome frame
- `props` — array of { text, icon } for feature bullets

To add/edit flywheel segments, modify the `segments` array in main.js. The SVG and content panels are generated dynamically from this data.

### Adding New Interactive Sections

Follow existing patterns:
1. Use `IntersectionObserver` for scroll-triggered behavior (see `revealObserver`, `catchupObserver`, `statObserver`)
2. Use `classList.toggle` for state changes
3. Use CSS transitions, not JS animation
4. Add observer setup inside the `DOMContentLoaded` listener if the element is dynamically created

---

## Project Commands (Claude Code)

Available via `/project:command-name` in Claude Code:

### Site-specific commands
| Command | Purpose |
|---------|---------|
| `/project:brand-check` | Audit HTML/CSS files for brand compliance violations |
| `/project:add-section` | Scaffold a new section following brand patterns |
| `/project:photo-prompt` | Generate AI image prompts matching We-Commerce photo style |
| `/project:brand-reskin` | Apply Fluid brand visuals to an external HTML file |

### Fluid Brand Intelligence commands
| Command | Purpose |
|---------|---------|
| `/project:fluid-brand` | Full brand reskin pipeline (styling + spec-check agents) |
| `/project:fluid-generate-web` | Generate Fluid-branded web pages/sections from a prompt |
| `/project:fluid-generate-social` | Generate Fluid-branded social posts (Instagram/LinkedIn) |
| `/project:fluid-generate-onepager` | Generate Fluid-branded one-pagers (letter size) |
| `/project:fluid-generate-slides` | Generate Fluid-branded slide decks (16:9) |
| `/project:fluid-redesign` | Redesign an existing page with Fluid layout + brand |
| `/project:fluid-rewrite` | Rewrite copy to match Fluid voice (no visual changes) |

These use subagents in `.claude/agents/` and read from `brand/`, `archetypes/`, and `tools/`.

### Updating from upstream
Skills were copied from `~/Fluid-Brand-Intelligence`. To sync updates:
```bash
cp -r ~/Fluid-Brand-Intelligence/.claude/agents .claude/
cp ~/Fluid-Brand-Intelligence/.claude/commands/fluid-*.md .claude/commands/
cp -r ~/Fluid-Brand-Intelligence/{brand,tools,archetypes} .
# Fix REPO_ROOT in .claude/commands/fluid-*.md: should be "." not "$HOME/Fluid-Brand-Intelligence"
```

---

## File Structure

```
index.html                        — Full page markup
styles.css                        — All styles (design system + components + responsive)
main.js                           — Interactivity (flywheel, testimonials, scroll, counters, nav)
assets/                           — Fonts, images, logos, icons, brushstrokes
brand/                            — Brand knowledge (color, typography, decorative rules, voice guide, products)
archetypes/                       — Layout skeletons for social posts and one-pagers
tools/                            — CLI validation (brand-compliance.cjs, dimension-check.cjs)
wecommerce-photo-style-guide.md   — Photo style analysis + Gemini prompting strategy
BRAND.md                          — This file (source of truth)
CLAUDE.md                         — Symlink -> BRAND.md (Claude Code reads this)
.cursorrules                      — Symlink -> BRAND.md (Cursor reads this)
.claude/commands/                 — Slash commands for Claude Code (site + FBI pipelines)
.claude/agents/                   — Subagent definitions (copy, layout, styling, spec-check)
.cursor/rules/                    — Cursor-specific rules (.mdc) that mirror Claude setup
```
