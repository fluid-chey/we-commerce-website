import { Tag } from "liquidjs";

export class MacroTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    const parts = token.args.trim().split(/\s+/);
    this.macroName = parts[0];
    this.params = parts.slice(1).join("").split(",").map((s) => s.trim()).filter(Boolean);
    if (!this.macroName) {
      throw new Error("macro: no name provided");
    }
    this.templates = [];
    const stream = parser.parseStream(remainTokens);
    stream
      .on("tag:endmacro", () => stream.stop())
      .on("template", (tpl) => this.templates.push(tpl))
      .on("end", () => {
        throw new Error(`macro tag not closed: ${token.getText()}`);
      })
      .start();
  }

  *render(ctx) {
    if (!this.liquid._macros) this.liquid._macros = {};
    this.liquid._macros[this.macroName] = {
      templates: this.templates,
      params: this.params,
    };
  }
}

export class MacroCallTag extends Tag {
  constructor(token, remainTokens, liquid) {
    super(token, remainTokens, liquid);
    const parts = token.args.trim().split(/\s+/);
    this.macroName = parts[0];
    this.args = parts
      .slice(1)
      .join(" ")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!this.macroName) {
      throw new Error("macro_call: no name provided");
    }
  }

  *render(ctx, emitter) {
    const macro = this.liquid._macros?.[this.macroName];
    if (!macro) {
      emitter.write(
        `<!-- preview: undefined macro "${this.macroName}" -->`
      );
      return;
    }

    const scope = {};
    for (let i = 0; i < macro.params.length; i++) {
      const paramName = macro.params[i];
      const argExpr = this.args[i];
      if (argExpr) {
        const val = ctx.get(argExpr.split("."));
        scope[paramName] = val !== undefined ? val : argExpr;
      }
    }

    ctx.push(scope);
    try {
      yield this.liquid.renderer.renderTemplates(macro.templates, ctx, emitter);
    } finally {
      ctx.pop();
    }
  }
}
