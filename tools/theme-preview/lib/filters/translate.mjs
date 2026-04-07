import { getTranslation } from "../locales.mjs";

export function registerTranslateFilter(liquid, locales, defaultLocale) {
  liquid.registerFilter("t", function (key, ...args) {
    const vars = args[0] && typeof args[0] === "object" ? args[0] : {};
    const locale = liquid.previewConfig?.locale || defaultLocale || "en";
    return getTranslation(locales, locale, key, vars);
  });
}
