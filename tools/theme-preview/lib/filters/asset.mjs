import { existsSync, readFileSync } from "fs";
import { join, basename } from "path";

export function registerAssetFilters(liquid, themeRoot, repoRoot) {
  function resolveAssetUrl(filename) {
    const clean = String(filename).replace(/^\//, "");
    const candidates = [
      join(themeRoot, "assets", clean),
      join(repoRoot, "assets", "brushstrokes", clean),
      join(repoRoot, "assets", "brushstrokes", basename(clean)),
      join(repoRoot, "assets", clean),
      join(repoRoot, "assets", "logos", basename(clean)),
      join(repoRoot, "assets", "icons", basename(clean)),
      join(repoRoot, "assets", "images", basename(clean)),
      join(repoRoot, "assets", "fonts", basename(clean)),
    ];
    for (const abs of candidates) {
      if (existsSync(abs)) {
        if (abs.startsWith(themeRoot)) {
          const rel = abs.slice(themeRoot.length).replace(/^\//, "");
          return `/theme-files/${rel.split("\\").join("/")}`;
        }
        const rel = abs.slice(repoRoot.length).replace(/^\//, "");
        return `/site-files/${rel.split("\\").join("/")}`;
      }
    }
    return "";
  }

  liquid.registerFilter("asset_url", (v) => {
    if (v == null || v === "") return "";
    return resolveAssetUrl(String(v));
  });

  liquid.registerFilter("image_url", (v) => {
    if (v == null || v === "") return "";
    if (typeof v === "string" && /^https?:\/\//i.test(v)) return v;
    if (typeof v === "object" && v !== null) {
      return v.url || v.src || "";
    }
    return resolveAssetUrl(String(v));
  });

  liquid.registerFilter("img_url", (v) => {
    if (typeof v === "string") return v;
    if (typeof v === "object" && v !== null) return v.url || v.src || "";
    return "";
  });

  liquid.registerFilter("file_url", (v) => {
    if (v == null || v === "") return "";
    return resolveAssetUrl(String(v));
  });

  liquid.registerFilter("inline_asset_content", (v) => {
    if (v == null || v === "") return "";
    const key = String(v);
    const url = resolveAssetUrl(key);
    if (!url) return "";

    if (key.includes(".svg")) return `<img src="${url}" />`;

    const absPath = url.startsWith("/theme-files/")
      ? join(themeRoot, url.slice("/theme-files/".length))
      : url.startsWith("/site-files/")
        ? join(repoRoot, url.slice("/site-files/".length))
        : null;

    if (!absPath || !existsSync(absPath)) return "";
    const content = readFileSync(absPath, "utf8");
    if (key.includes(".css")) return `<style>${content}</style>`;
    if (key.includes(".js")) return `<script>${content}</script>`;
    return content;
  });
}
