import { Tag } from "liquidjs";

export class FormTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    this._parseMarkup(token.args.trim());
    this.templates = [];
    const stream = parser.parseStream(remainTokens);
    stream
      .on("tag:endform", () => stream.stop())
      .on("template", (tpl) => this.templates.push(tpl))
      .on("end", () => {
        throw new Error(`form tag not closed: ${token.getText()}`);
      })
      .start();
  }

  _parseMarkup(markup) {
    const parts = markup.split(",").map((s) => s.trim());
    this.formType = (parts[0] || "").replace(/['"]/g, "");
    this.formVariableExpr = parts[1]?.trim() || null;
    this.attrs = {};
    for (const part of parts.slice(2)) {
      const [key, ...rest] = part.split(":");
      if (key && rest.length) {
        const val = rest.join(":").trim().replace(/['"]/g, "");
        this.attrs[key.trim()] = val;
      }
    }
  }

  *render(ctx, emitter) {
    const chunks = [];
    const capture = { write: (s) => chunks.push(s) };
    yield this.liquid.renderer.renderTemplates(this.templates, ctx, capture);
    const content = chunks.join("");

    if (this.formType === "product" && this.formVariableExpr) {
      const product = ctx.get(this.formVariableExpr.split("."));
      if (product) {
        const variantId =
          product.selected_or_first_available_variant?.id || "";
        const attrStr = this._renderAttrs(ctx);
        emitter.write(
          `<form ${attrStr} data-fluid-checkout-group="${variantId}" data-variant="${variantId}">\n${content}\n</form>`
        );
        return;
      }
    }

    const attrStr = this._renderAttrs(ctx);
    emitter.write(`<form ${attrStr}>\n${content}\n</form>`);
  }

  _renderAttrs(ctx) {
    return Object.entries(this.attrs)
      .map(([key, val]) => {
        const resolved = ctx.get(val.split(".")) ?? val;
        return `${key}="${resolved}"`;
      })
      .join(" ");
  }
}
