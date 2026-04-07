# Fluid Theme Preview (Local)

Full-featured local Liquid renderer for Fluid themes with near-parity to the
production Rails renderer. Runs entirely offline — no backend or database
required.

## Quick Start

```bash
cd tools/theme-preview
npm install
npm start
# Open http://localhost:3333/
```

## Features

### Liquid Tags

| Tag | Status | Notes |
|-----|--------|-------|
| `{% section 'name' %}` | Supported | Resolves from `sections/` and template dirs (`navbar/`, `footer/`) |
| `{% render 'name' %}` | Supported | Resolves from `components/` and `sections/`. Supports `for`, `with`, `as`, and key/value attributes |
| `{% schema %}` | Supported | Parsed for defaults, stripped from output |
| `{% style %}` | Supported | Renders inner Liquid, wraps in `<style>` |
| `{% form %}` | Supported | Product forms with `data-fluid-checkout-group` attributes |
| `{% paginate %}` | Supported | Slices collections, provides `paginate` object with parts/prev/next |
| `{% macro %}` / `{% macro_call %}` | Supported | Recursive template macros (e.g., nested nav menus) |
| `{% javascript %}` | Supported | Wraps content in `<script>` with DOMContentLoaded |
| `{% layout %}` | Supported | No-op tag (layout is always `layouts/theme.liquid`) |
| `{% sections %}` | Supported | No-op (JSON template ordering) |

### Liquid Filters

| Filter | Notes |
|--------|-------|
| `asset_url` | Resolves to `/theme-files/` or `/site-files/` paths |
| `image_url` | Passes through absolute URLs, resolves local assets |
| `img_url` | Extracts URL from string or object |
| `file_url` | Alias for `asset_url` |
| `inline_asset_content` | Inlines CSS/JS/SVG asset content |
| `t` | Translation with dot-path keys, pluralization, interpolation |
| `money` / `money_with_currency` / `money_without_trailing_zeros` | Currency formatting |
| `json` | JSON serialization |
| `font_face` | Generates `@font-face` CSS block |
| `font_family` | Extracts font family string |
| `stylesheet_tag` / `script_tag` | Wraps URLs in HTML tags |
| `img_tag` / `image_tag` / `link_to` | HTML helper tags |
| `escape` / `unescape` | HTML entity encoding/decoding |
| `handleize` / `pluralize` / `date` / `time_tag` | Utility filters |
| `url_encode` / `url_decode` / `strip_html` / `newline_to_br` | Text filters |

### Layout System

Templates are automatically wrapped in `layouts/theme.liquid` (if present).
The layout receives `content_for_layout` (the rendered page) and
`content_for_header` (empty string for preview).

### Settings

Global theme settings are loaded from `config/settings_data.json` and
available as `{{ settings.color_primary }}`, etc.

### Translations (i18n)

Locale files from `locales/*.json` are loaded at startup. Use `?locale=es`
to switch languages. Falls back to English for missing keys.

### Context & Stubbing

Edit `context.json` to override platform objects (company, cart, products,
etc.). The file is merged on top of `default-context.json` which provides
sensible empty defaults.

## URL Parameters

| Param | Default | Purpose |
|-------|---------|---------|
| `page` | `home_page` | Template type directory |
| `name` | `default` | Template name subdirectory |
| `locale` | `en` | Language for `| t` filter |
| `page_num` | `1` | Current page for `{% paginate %}` |

## Modes

```bash
# Standard
npm start

# With live reload (auto-refreshes browser on file changes)
node server.mjs --watch

# Verbose logging
VERBOSE=1 npm start

# Custom theme root
THEME_ROOT=MyOtherTheme npm start

# Custom port
PORT=4000 npm start
```

## API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /` | Render page template |
| `GET /__pages` | List available page/template combinations |
| `GET /__reload` | SSE endpoint for live reload (watch mode) |
| `GET /theme-files/*` | Static files from theme directory |
| `GET /site-files/*` | Static files from repo root |

## Syntax Compatibility

The preprocessor automatically normalizes Ruby Liquid syntax to LiquidJS:
- `||` → `or`
- `&&` → `and`

## Theme Directory Structure

```
NewBaseUpdate/
  layouts/theme.liquid           ← Layout wrapper
  config/settings_data.json      ← Theme settings
  locales/*.json                 ← Translation files
  assets/                        ← Static assets (CSS, JS, fonts, images)
  sections/*/index.liquid         ← Section templates
  components/*/index.liquid       ← Render-tag snippets
  home_page/default/index.liquid  ← Page templates
  product/default/index.liquid
  navbar/default/index.liquid     ← Global templates
  footer/default/index.liquid
  ...
```

Each section/component can have:
- `index.liquid` — Template
- `variables.json` — Default variable values
- `styles.css` — Component styles (auto-injected)

## Limitations

- Not byte-identical to Fluid's Ruby Liquid renderer (uses LiquidJS)
- Database-backed features (DAM assets, dynamic data loaders) are stubbed
- Product/collection/enrollment drops are plain JSON objects, not Liquid Drops
- For production-identical rendering, use the Fluid app's `/theme_preview`
  endpoint (see `docs/theme_preview.md` in the Fluid repo)
