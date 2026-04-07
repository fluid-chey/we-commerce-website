export function registerStyleFilters(liquid) {
  liquid.registerFilter("font_face", (fontData, opts) => {
    if (!fontData) return "";
    if (typeof fontData === "string") {
      return `@font-face {
  font-family: "${fontData}";
  src: url("https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontData)}:wght@100..900&display=swap");
  font-style: ${opts?.font_style || "normal"};
  font-weight: ${opts?.font_weight || "400"};
  font-display: ${opts?.font_display || "swap"};
}`;
    }
    if (typeof fontData === "object") {
      const family = fontData.family || fontData.name || "";
      const fallback = fontData.fallback_families || "sans-serif";
      const src = fontData.src || "";
      return `@font-face {
  font-family: "${family}", "${fallback}";
  src: url("${src}");
  font-style: ${opts?.font_style || "normal"};
  font-weight: ${opts?.font_weight || "400"};
  font-display: ${opts?.font_display || "swap"};
}`;
    }
    return "";
  });

  liquid.registerFilter("font_family", (fontData) => {
    if (!fontData) return "";
    if (typeof fontData === "string") return `'${fontData}', sans-serif`;
    if (typeof fontData === "object") {
      const family = fontData.family || fontData.name || "";
      const fallback = fontData.fallback_families || "sans-serif";
      return `'${family}', ${fallback}`;
    }
    return "";
  });
}
