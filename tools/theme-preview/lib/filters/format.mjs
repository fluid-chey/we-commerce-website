export function registerFormatFilters(liquid) {
  liquid.registerFilter("money", (value, format) => {
    const num = Number(value);
    if (isNaN(num)) return String(value ?? "");
    const fmt = format || "${{amount}}";
    const fixed = (num / 100).toFixed(2);
    const noTrailing = fixed.replace(/\.00$/, "");
    return fmt
      .replace("{{amount}}", fixed)
      .replace("{{amount_no_decimals}}", noTrailing)
      .replace("{{amount_with_comma_separator}}", fixed.replace(".", ","));
  });

  liquid.registerFilter("money_with_currency", (value) => {
    const num = Number(value);
    if (isNaN(num)) return String(value ?? "");
    return `$${(num / 100).toFixed(2)} USD`;
  });

  liquid.registerFilter("money_without_trailing_zeros", (value) => {
    const num = Number(value);
    if (isNaN(num)) return String(value ?? "");
    const fixed = (num / 100).toFixed(2);
    return `$${fixed.replace(/\.?0+$/, "")}`;
  });

  liquid.registerFilter("json", (value) => {
    try {
      return JSON.stringify(normalize(value));
    } catch {
      return String(value ?? "");
    }
  });

  liquid.registerFilter("handleize", (v) => {
    return String(v ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  });

  liquid.registerFilter("pluralize", (count, singular, plural) => {
    return Number(count) === 1 ? singular : plural;
  });

  liquid.registerFilter("time_tag", (date, format) => {
    const d = date instanceof Date ? date : new Date(date);
    const iso = d.toISOString();
    const display = format || iso;
    return `<time datetime="${iso}">${display}</time>`;
  });

  liquid.registerFilter("date", (value, format) => {
    if (!value) return "";
    const d = value === "now" ? new Date() : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    if (!format) return d.toISOString();
    return formatDate(d, format);
  });

  liquid.registerFilter("url_encode", (v) => encodeURIComponent(String(v ?? "")));
  liquid.registerFilter("url_decode", (v) => decodeURIComponent(String(v ?? "")));

  liquid.registerFilter("strip_html", (v) =>
    String(v ?? "").replace(/<[^>]*>/g, "")
  );

  liquid.registerFilter("newline_to_br", (v) =>
    String(v ?? "").replace(/\n/g, "<br>\n")
  );

  liquid.registerFilter("replace_first", (v, search, replace) =>
    String(v ?? "").replace(search, replace ?? "")
  );
}

function normalize(val) {
  if (val === null || val === undefined) return null;
  if (Array.isArray(val)) return val.map(normalize);
  if (typeof val === "object" && val.constructor === Object) {
    return Object.fromEntries(
      Object.entries(val).map(([k, v]) => [k, normalize(v)])
    );
  }
  return val;
}

function formatDate(d, fmt) {
  return fmt
    .replace("%Y", d.getFullYear())
    .replace("%m", String(d.getMonth() + 1).padStart(2, "0"))
    .replace("%d", String(d.getDate()).padStart(2, "0"))
    .replace("%H", String(d.getHours()).padStart(2, "0"))
    .replace("%M", String(d.getMinutes()).padStart(2, "0"))
    .replace("%S", String(d.getSeconds()).padStart(2, "0"))
    .replace("%B", d.toLocaleString("en", { month: "long" }))
    .replace("%b", d.toLocaleString("en", { month: "short" }))
    .replace("%A", d.toLocaleString("en", { weekday: "long" }))
    .replace("%a", d.toLocaleString("en", { weekday: "short" }));
}
