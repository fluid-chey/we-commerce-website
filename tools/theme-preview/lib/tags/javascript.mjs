import { Tag } from "liquidjs";

export class JavascriptTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    this.templates = [];
    const stream = parser.parseStream(remainTokens);
    stream
      .on("tag:endjavascript", () => stream.stop())
      .on("template", (tpl) => this.templates.push(tpl))
      .on("end", () => {
        throw new Error(`javascript tag not closed: ${token.getText()}`);
      })
      .start();
  }

  *render(ctx, emitter) {
    const chunks = [];
    const capture = { write: (s) => chunks.push(s) };
    yield this.liquid.renderer.renderTemplates(this.templates, ctx, capture);
    const content = chunks.join("").trim();
    emitter.write(`<script>\n  document.addEventListener('DOMContentLoaded', function() {\n    ${content}\n  });\n</script>`);
  }
}
