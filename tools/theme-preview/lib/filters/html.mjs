export function registerHtmlFilters(liquid) {
  liquid.registerFilter("script_tag", (url) => {
    if (!url) return "";
    return `<script src="${url}" type="text/javascript"></script>`;
  });

  liquid.registerFilter("stylesheet_tag", (url, opts) => {
    if (!url) return "";
    let tag = `<link href="${escapeHtml(String(url))}" rel="stylesheet" type="text/css" media="all" />`;
    if (opts?.preload) {
      tag += `\n<link href="${escapeHtml(String(url))}" rel="preload" as="style" />`;
    }
    return tag;
  });

  liquid.registerFilter("link_to", (text, url, title) => {
    return `<a href="${url || ""}" title="${title || ""}">${text || ""}</a>`;
  });

  liquid.registerFilter("img_tag", (url, alt) => {
    return `<img src="${url || ""}" alt="${alt || ""}" />`;
  });

  liquid.registerFilter("image_tag", (url, opts) => {
    const attrStr = opts && typeof opts === "object"
      ? Object.entries(opts).map(([k, v]) => `${k}="${v}"`).join(" ")
      : "";
    return `<img src="${url || ""}" ${attrStr} />`;
  });

  liquid.registerFilter("escape", (v) => escapeHtml(String(v ?? "")));
  liquid.registerFilter("unescape", (v) => unescapeHtml(String(v ?? "")));
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function unescapeHtml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
