import { readFileSync, existsSync, readdirSync } from "fs";
import { join, basename } from "path";

export function loadLocales(themeRoot) {
  const dir = join(themeRoot, "locales");
  if (!existsSync(dir)) return {};
  const locales = {};
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    const locale = basename(file, ".json");
    try {
      locales[locale] = JSON.parse(readFileSync(join(dir, file), "utf8"));
    } catch {
      locales[locale] = {};
    }
  }
  return locales;
}

export function getTranslation(locales, locale, key, vars = {}) {
  const keys = String(key).split(".");
  let value = dig(locales[locale], keys);
  if (value === undefined && locale !== "en") {
    value = dig(locales.en, keys);
  }
  if (value === undefined) return `Translation missing: ${key}`;
  if (value === "") return " ";

  if (typeof value === "object" && value !== null && vars.count != null) {
    const pluralKey = pluralizationKey(vars.count);
    value = value[pluralKey] || value.other;
  }

  if (typeof value !== "string") return String(value ?? "");
  return interpolate(value, vars);
}

function dig(obj, keys) {
  let current = obj;
  for (const k of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = current[k];
  }
  return current;
}

function pluralizationKey(count) {
  const n = Number(count);
  if (n === 1) return "one";
  return "other";
}

function interpolate(template, vars) {
  if (!vars || typeof vars !== "object") return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    return vars[key] !== undefined ? String(vars[key]) : `{{ ${key} }}`;
  });
}
