/**
 * Full-featured local Liquid theme preview with parity to the Fluid Rails renderer.
 * Supports: layouts, sections, components (render), forms, paginate, macros,
 * translations, settings, and the complete template context.
 */
import express from "express";
import { readFileSync, existsSync, watch, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { createEngine } from "./lib/engine.mjs";
import { loadSettings } from "./lib/settings.mjs";
import { loadLocales } from "./lib/locales.mjs";
import { loadJson, buildScope, prepareLiquidSource } from "./lib/context.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const THEME_ROOT = process.env.THEME_ROOT
  ? join(REPO_ROOT, process.env.THEME_ROOT)
  : join(REPO_ROOT, "NewBaseUpdate");
const CONTEXT_PATH = process.env.THEME_PREVIEW_CONTEXT
  ? join(REPO_ROOT, process.env.THEME_PREVIEW_CONTEXT)
  : join(__dirname, "context.json");
const PORT = Number(process.env.PORT || 3333);
const VERBOSE = process.argv.includes("--verbose") || process.env.VERBOSE === "1";
const WATCH = process.argv.includes("--watch") || process.env.WATCH === "1";

// ---------------------------------------------------------------------------
// State (reloaded on file change when --watch is active)
// ---------------------------------------------------------------------------
let settings = loadSettings(THEME_ROOT);
let locales = loadLocales(THEME_ROOT);
let defaultCtx = loadJson(join(__dirname, "default-context.json"), {});
let userCtx = loadJson(CONTEXT_PATH, {});

function mergedContext() {
  return { ...defaultCtx, ...userCtx };
}

function buildEngine() {
  const ctx = mergedContext();
  return createEngine({
    themeRoot: THEME_ROOT,
    repoRoot: REPO_ROOT,
    context: ctx,
    locales,
    settings,
  });
}

let liquid = buildEngine();

// ---------------------------------------------------------------------------
// Rendering pipeline
// ---------------------------------------------------------------------------
async function renderPage(engine, pageType, templateName, scope) {
  const pagePath = join(THEME_ROOT, pageType, templateName, "index.liquid");
  if (!existsSync(pagePath)) {
    throw new Error(`Missing template: ${pagePath}`);
  }
  const source = prepareLiquidSource(readFileSync(pagePath, "utf8"));
  return engine.parseAndRender(source, scope);
}

async function renderWithLayout(engine, pageType, templateName, scope) {
  engine._macros = {};

  const pageHtml = await renderPage(engine, pageType, templateName, scope);

  const layoutPath = join(THEME_ROOT, "layouts", "theme.liquid");
  if (!existsSync(layoutPath)) {
    return pageHtml;
  }

  const layoutSource = readFileSync(layoutPath, "utf8");
  const layoutScope = { ...scope, content_for_layout: pageHtml };
  return engine.parseAndRender(layoutSource, layoutScope);
}

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------
const app = express();

app.use("/theme-files", express.static(THEME_ROOT));
app.use("/site-files", express.static(REPO_ROOT));

let sseClients = [];

app.get("/__reload", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("data: connected\n\n");
  sseClients.push(res);
  req.on("close", () => {
    sseClients = sseClients.filter((c) => c !== res);
  });
});

function notifyReload() {
  for (const client of sseClients) {
    client.write("data: reload\n\n");
  }
}

const SKIP_DIRS = new Set([
  "assets", "components", "config", "layouts", "locales", "sections", "node_modules",
]);

app.get("/__pages", (_req, res) => {
  const pages = [];
  const entries = readdirSync(THEME_ROOT, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || SKIP_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
    const subDir = join(THEME_ROOT, entry.name);
    try {
      const subs = readdirSync(subDir, { withFileTypes: true });
      for (const sub of subs) {
        if (!sub.isDirectory()) continue;
        const indexPath = join(subDir, sub.name, "index.liquid");
        if (existsSync(indexPath)) {
          pages.push({ page: entry.name, name: sub.name });
        }
      }
    } catch { /* skip unreadable dirs */ }
  }
  res.json(pages);
});

app.get("/", async (req, res) => {
  const pageType = req.query.page || "home_page";
  const templateName = req.query.name || "default";
  const locale = req.query.locale || "en";
  const pageNum = parseInt(req.query.page_num, 10) || 1;

  try {
    liquid.previewConfig.locale = locale;
    liquid.previewConfig.currentPage = pageNum;

    const ctx = mergedContext();
    const scope = buildScope({
      settings,
      userContext: ctx,
      locale,
      pageType,
    });

    const html = await renderWithLayout(liquid, pageType, templateName, scope);

    if (VERBOSE) {
      console.log(`[render] ${pageType}/${templateName} locale=${locale} page=${pageNum}`);
    }

    const banner = buildBanner(pageType, templateName, locale);
    const liveReloadScript = WATCH ? LIVE_RELOAD_SCRIPT : "";

    res.type("html").send(`<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Theme preview — ${pageType}/${templateName}</title>
  <style>
    .theme-preview-banner {
      font: 12px/1.4 system-ui, sans-serif;
      padding: 8px 16px;
      background: #1a1a1a;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      color: #888;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      position: sticky;
      top: 0;
      z-index: 99999;
    }
    .theme-preview-banner a { color: #42b1ff; text-decoration: none; }
    .theme-preview-banner a:hover { text-decoration: underline; }
    .theme-preview-banner select, .theme-preview-banner input {
      background: #111; color: #ccc; border: 1px solid #333;
      border-radius: 4px; padding: 2px 6px; font-size: 12px;
    }
    .tpb-sep { color: #444; }
  </style>
</head>
<body>
  ${banner}
  ${html}
  ${liveReloadScript}
</body>
</html>`);
  } catch (err) {
    console.error("[render error]", err);
    res.status(500).type("html").send(errorPage(err, pageType, templateName));
  }
});

// ---------------------------------------------------------------------------
// Dev banner with template picker
// ---------------------------------------------------------------------------
function buildBanner(pageType, templateName, locale) {
  return `<div class="theme-preview-banner">
  <span>Local Theme Preview</span>
  <span class="tpb-sep">|</span>
  <span>
    <label>Page: <input id="tpb-page" value="${pageType}" size="14"></label>
    <label>/ <input id="tpb-name" value="${templateName}" size="10"></label>
    <label>Locale: <input id="tpb-locale" value="${locale}" size="4"></label>
    <button onclick="tpbNav()">Go</button>
  </span>
  <span class="tpb-sep">|</span>
  <span>Theme: <code>${THEME_ROOT.replace(REPO_ROOT, ".")}</code></span>
  <script>
    function tpbNav() {
      const p = document.getElementById('tpb-page').value;
      const n = document.getElementById('tpb-name').value;
      const l = document.getElementById('tpb-locale').value;
      location.href = '/?page=' + encodeURIComponent(p) + '&name=' + encodeURIComponent(n) + '&locale=' + encodeURIComponent(l);
    }
    document.querySelectorAll('#tpb-page,#tpb-name,#tpb-locale').forEach(el => {
      el.addEventListener('keydown', e => { if (e.key === 'Enter') tpbNav(); });
    });
  </script>
</div>`;
}

// ---------------------------------------------------------------------------
// Error overlay
// ---------------------------------------------------------------------------
function errorPage(err, pageType, templateName) {
  const stack = String(err?.stack || err)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><title>Render Error</title>
<style>
  body { margin: 0; background: #1a0505; color: #f5f0e8; font-family: system-ui, sans-serif; padding: 40px; }
  h1 { color: #ff6b6b; font-size: 20px; margin: 0 0 8px; }
  .meta { color: #888; font-size: 13px; margin-bottom: 20px; }
  pre { background: #111; padding: 20px; border-radius: 8px; overflow-x: auto; font-size: 13px;
        border: 1px solid rgba(255,100,100,0.2); line-height: 1.5; }
  a { color: #42b1ff; }
</style>
</head><body>
<h1>Liquid Render Error</h1>
<div class="meta">Template: ${pageType}/${templateName}</div>
<pre>${stack}</pre>
<p><a href="/?page=${encodeURIComponent(pageType)}&name=${encodeURIComponent(templateName)}">Retry</a></p>
</body></html>`;
}

// ---------------------------------------------------------------------------
// Live reload (--watch mode)
// ---------------------------------------------------------------------------
const LIVE_RELOAD_SCRIPT = `<script>
(function() {
  var es = new EventSource('/__reload');
  es.onmessage = function(e) {
    if (e.data === 'reload') location.reload();
  };
  es.onerror = function() {
    setTimeout(function() { location.reload(); }, 2000);
  };
})();
</script>`;

if (WATCH) {
  let debounce = null;
  const reload = () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      console.log("[watch] Change detected, reloading...");
      settings = loadSettings(THEME_ROOT);
      locales = loadLocales(THEME_ROOT);
      userCtx = loadJson(CONTEXT_PATH, {});
      liquid = buildEngine();
      notifyReload();
    }, 300);
  };

  try {
    watch(THEME_ROOT, { recursive: true }, reload);
    watch(CONTEXT_PATH, reload);
    console.log("[watch] Watching for changes...");
  } catch (e) {
    console.warn("[watch] fs.watch failed, live reload disabled:", e.message);
  }
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Theme preview: http://localhost:${PORT}/`);
  console.log(`  THEME_ROOT = ${THEME_ROOT}`);
  console.log(`  context    = ${CONTEXT_PATH}`);
  console.log(`  settings   = ${Object.keys(settings).length} keys loaded`);
  console.log(`  locales    = ${Object.keys(locales).join(", ") || "(none)"}`);
  console.log(`  verbose    = ${VERBOSE}`);
  console.log(`  watch      = ${WATCH}`);
  console.log(`\nAvailable params: ?page=home_page&name=default&locale=en&page_num=1`);
});
