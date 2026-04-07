import { readFileSync, existsSync } from "fs";
import { join } from "path";

export function loadJson(path, fallback = {}) {
  if (!existsSync(path)) return { ...fallback };
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return { ...fallback };
  }
}

export function buildScope({ settings, userContext, locale, pageType }) {
  const company = userContext.company || {
    name: "Preview Company",
    base_url: "http://localhost:3333",
    logo_url: "",
    checkout_v2_enabled: true,
  };

  return {
    settings,
    company,
    localization: {
      language: { iso_code: locale || "en" },
      available_languages: [{ iso_code: "en", name: "English" }],
    },
    request: {
      page_type: pageType || "home_page",
      host: "localhost",
      path: "/",
      locale: locale || "en",
    },
    content_for_header: "",
    cart: userContext.cart || { items: [], item_count: 0, total_price: 0 },
    cart_url: userContext.cart_url || "/cart",
    affiliate: userContext.affiliate || null,
    contact: userContext.contact || null,
    current_country_iso: userContext.current_country_iso || "US",
    current_country_name: userContext.current_country_name || "United States",
    current_selected_locale: locale || "en",
    current_language_name: "English",
    fluid_credit: "preview",
    ...userContext,
    sections: userContext.sections || {},
  };
}

export function loadVariablesJson(dirPath) {
  const varsPath = join(dirPath, "variables.json");
  if (!existsSync(varsPath)) return {};
  try {
    const parsed = JSON.parse(readFileSync(varsPath, "utf8"));
    if (typeof parsed === "object" && parsed !== null) {
      return parsed.settings ? parsed.settings : parsed;
    }
    return {};
  } catch {
    return {};
  }
}

export function schemaDefaults(liquidSource) {
  const m = liquidSource.match(
    /{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/
  );
  if (!m) return {};
  try {
    const json = JSON.parse(m[1].trim());
    const out = {};
    for (const s of json.settings || []) {
      if (s?.id != null && Object.prototype.hasOwnProperty.call(s, "default")) {
        out[s.id] = s.default;
      }
    }
    return out;
  } catch {
    return {};
  }
}

const SCHEMA_RE = /{%-?\s*schema\s*-?%}[\s\S]*?{%-?\s*endschema\s*-?%}/g;

export function stripSchemas(src) {
  return src.replace(SCHEMA_RE, "");
}

/**
 * Normalize Ruby Liquid syntax to LiquidJS-compatible syntax.
 * Replaces || with or, && with and inside {% %} tag blocks.
 * Also handles .blank? / .empty? / .size comparisons.
 */
export function preprocessLiquid(src) {
  return src.replace(/{%-?[\s\S]*?-?%}/g, (match) => {
    return match
      .replace(/\|\|/g, " or ")
      .replace(/&&/g, " and ");
  });
}

export function prepareLiquidSource(src) {
  return preprocessLiquid(stripSchemas(src));
}
