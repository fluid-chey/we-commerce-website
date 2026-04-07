import { Tag } from "liquidjs";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { prepareLiquidSource, schemaDefaults, loadVariablesJson } from "../context.mjs";

const TEMPLATE_SECTIONS = ["navbar", "library_navbar", "footer"];

export class SectionTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    void parser;
    const str = token.args.trim();
    const typeMatch = str.match(/['"]([^'"]+)['"]/);
    if (!typeMatch) {
      throw new Error(`section: invalid args "${str}"`);
    }
    this.sectionType = typeMatch[1];
    const idMatch = str.match(/\bid:\s*['"]([^'"]+)['"]/);
    this.sectionId = idMatch ? idMatch[1] : this.sectionType;
  }

  *render(ctx, emitter) {
    const cfg = this.liquid.previewConfig;
    const { filePath, dirPath } = this._resolveSection(cfg.themeRoot);

    if (!filePath) {
      emitter.write(
        `\n<!-- preview: missing section "${this.sectionType}" -->\n`
      );
      return;
    }

    const body = readFileSync(filePath, "utf8");
    const stripped = prepareLiquidSource(body);
    const settings = this._mergeSettings(cfg, dirPath);

    const isTemplate = TEMPLATE_SECTIONS.includes(this.sectionType);
    const dataAttrKey = isTemplate ? "data-fluid-template" : "data-fluid-section";
    const dataTypeKey = isTemplate
      ? "data-fluid-template-type"
      : "data-fluid-section-type";

    ctx.push({
      section: {
        id: this.sectionId,
        settings,
        blocks: settings._blocks || [],
      },
    });
    try {
      emitter.write(
        `<section ${dataAttrKey}="${this.sectionId}" ${dataTypeKey}="${this.sectionType}">`
      );
      const tpls = this.liquid.parse(stripped);
      yield this.liquid.renderer.renderTemplates(tpls, ctx, emitter);
      emitter.write(`</section>`);
    } finally {
      ctx.pop();
    }

    const cssPath = join(dirPath, "styles.css");
    if (existsSync(cssPath)) {
      emitter.write(`<style>\n${readFileSync(cssPath, "utf8")}\n</style>`);
    }
  }

  _resolveSection(themeRoot) {
    const candidates = [
      join(themeRoot, "sections", this.sectionType),
      join(themeRoot, this.sectionType, "default"),
    ];

    if (this.sectionType.startsWith("main_")) {
      const short = this.sectionType.slice(5);
      candidates.push(join(themeRoot, "sections", short));
    }

    for (const dir of candidates) {
      const indexPath = join(dir, "index.liquid");
      if (existsSync(indexPath)) {
        return { filePath: indexPath, dirPath: dir };
      }
    }
    return { filePath: null, dirPath: null };
  }

  _mergeSettings(cfg, dirPath) {
    if (!dirPath) return {};
    const sectionPath = join(dirPath, "index.liquid");
    if (!existsSync(sectionPath)) return {};

    const raw = readFileSync(sectionPath, "utf8");
    const defaults = schemaDefaults(raw);
    const fileVars = loadVariablesJson(dirPath);
    const sectionCtx = cfg.context?.sections?.[this.sectionId];
    const override =
      sectionCtx && typeof sectionCtx === "object"
        ? sectionCtx.settings || sectionCtx
        : {};

    return { ...defaults, ...fileVars, ...override };
  }
}
