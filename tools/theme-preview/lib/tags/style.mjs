import { Tag } from "liquidjs";

export class StyleTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    this.templates = [];
    const stream = parser.parseStream(remainTokens);
    stream
      .on("tag:endstyle", () => stream.stop())
      .on("template", (tpl) => this.templates.push(tpl))
      .on("end", () => {
        throw new Error(`style tag not closed: ${token.getText()}`);
      })
      .start();
  }

  *render(ctx, emitter) {
    emitter.write("\n<style>\n");
    yield this.liquid.renderer.renderTemplates(this.templates, ctx, emitter);
    emitter.write("\n</style>\n");
  }
}
