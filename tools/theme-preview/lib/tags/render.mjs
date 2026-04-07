import { Tag } from "liquidjs";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { prepareLiquidSource, loadVariablesJson } from "../context.mjs";

export class RenderTag extends Tag {
  constructor(token, remainTokens, liquid) {
    super(token, remainTokens, liquid);
    const markup = token.args.trim();
    this._parseMarkup(markup);
  }

  _parseMarkup(markup) {
    const nameMatch = markup.match(/['"]([^'"]+)['"]/);
    if (!nameMatch) {
      throw new Error(`render: missing template name in "${markup}"`);
    }
    this.templateName = nameMatch[1];

    const rest = markup.slice(nameMatch.index + nameMatch[0].length).trim();

    this.forExpr = null;
    this.aliasName = null;
    this.attributes = {};

    const forMatch = rest.match(
      /^,?\s*for\s+(\S+?)(?:\s+as\s+(\w+))?(?:\s*,\s*(.*))?$/
    );
    if (forMatch) {
      this.forExpr = forMatch[1];
      this.aliasName = forMatch[2] || this.templateName.split("/").pop();
      if (forMatch[3]) this._parseAttributes(forMatch[3]);
      return;
    }

    const withMatch = rest.match(
      /^,?\s*with\s+(\S+?)(?:\s+as\s+(\w+))?(?:\s*,\s*(.*))?$/
    );
    if (withMatch) {
      this.withExpr = withMatch[1];
      this.aliasName = withMatch[2] || this.templateName.split("/").pop();
      if (withMatch[3]) this._parseAttributes(withMatch[3]);
      return;
    }

    if (rest.startsWith(",")) {
      this._parseAttributes(rest.slice(1).trim());
    }
  }

  _parseAttributes(str) {
    if (!str) return;
    const parts = str.split(",");
    for (const part of parts) {
      const colonIdx = part.indexOf(":");
      if (colonIdx === -1) continue;
      const key = part.slice(0, colonIdx).trim();
      const val = part.slice(colonIdx + 1).trim();
      this.attributes[key] = val.replace(/^['"]|['"]$/g, "");
    }
  }

  *render(ctx, emitter) {
    const cfg = this.liquid.previewConfig;
    const { filePath, dirPath } = this._resolveTemplate(cfg.themeRoot);
    if (!filePath) {
      emitter.write(
        `\n<!-- preview: missing component "${this.templateName}" -->\n`
      );
      return;
    }

    const body = readFileSync(filePath, "utf8");
    const stripped = prepareLiquidSource(body);
    const componentVars = dirPath ? loadVariablesJson(dirPath) : {};

    const tpls = this.liquid.parse(stripped);

    if (this.forExpr) {
      const collection = ctx.get([this.forExpr]) ?? [];
      const items = Array.isArray(collection) ? collection : [];
      const varName = this.aliasName || this.templateName.split("/").pop();
      for (let i = 0; i < items.length; i++) {
        const scope = {
          ...componentVars,
          ...this._resolveAttributes(ctx),
          [varName]: items[i],
          forloop: {
            index: i + 1,
            index0: i,
            first: i === 0,
            last: i === items.length - 1,
            length: items.length,
            rindex: items.length - i,
            rindex0: items.length - i - 1,
          },
        };
        ctx.push(scope);
        try {
          yield this.liquid.renderer.renderTemplates(tpls, ctx, emitter);
        } finally {
          ctx.pop();
        }
      }
    } else {
      const scope = { ...componentVars, ...this._resolveAttributes(ctx) };
      if (this.withExpr) {
        const varName = this.aliasName || this.templateName.split("/").pop();
        scope[varName] = ctx.get([this.withExpr]);
      }
      ctx.push(scope);
      try {
        yield this.liquid.renderer.renderTemplates(tpls, ctx, emitter);
      } finally {
        ctx.pop();
      }
    }

    if (dirPath) {
      const cssPath = join(dirPath, "styles.css");
      if (existsSync(cssPath)) {
        emitter.write(
          `<style>\n${readFileSync(cssPath, "utf8")}\n</style>`
        );
      }
    }
  }

  _resolveTemplate(themeRoot) {
    const name = this.templateName;
    const candidates = [
      {
        file: join(themeRoot, "components", name, "index.liquid"),
        dir: join(themeRoot, "components", name),
      },
      {
        file: join(themeRoot, "sections", name, "index.liquid"),
        dir: join(themeRoot, "sections", name),
      },
      {
        file: join(themeRoot, "components", `${name}.liquid`),
        dir: join(themeRoot, "components"),
      },
    ];

    if (name.includes("/")) {
      const parts = name.split("/");
      const last = parts[parts.length - 1];
      candidates.push({
        file: join(themeRoot, ...parts, "index.liquid"),
        dir: join(themeRoot, ...parts),
      });
      candidates.push({
        file: join(themeRoot, "components", last, "index.liquid"),
        dir: join(themeRoot, "components", last),
      });
    }

    for (const c of candidates) {
      if (existsSync(c.file)) {
        return { filePath: c.file, dirPath: c.dir };
      }
    }
    return { filePath: null, dirPath: null };
  }

  _resolveAttributes(ctx) {
    const resolved = {};
    for (const [key, val] of Object.entries(this.attributes)) {
      if (val === "true") resolved[key] = true;
      else if (val === "false") resolved[key] = false;
      else if (val === "nil" || val === "null") resolved[key] = null;
      else if (/^\d+(\.\d+)?$/.test(val)) resolved[key] = Number(val);
      else if (val.startsWith("'") || val.startsWith('"'))
        resolved[key] = val.slice(1, -1);
      else {
        const looked = ctx.get(val.split("."));
        resolved[key] = looked !== undefined ? looked : val;
      }
    }
    return resolved;
  }
}
