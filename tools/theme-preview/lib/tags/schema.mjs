import { Tag } from "liquidjs";

export class SchemaTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    const stream = parser.parseStream(remainTokens);
    stream
      .on("tag:endschema", () => stream.stop())
      .on("template", () => {})
      .on("end", () => {
        throw new Error(`schema tag not closed: ${token.getText()}`);
      })
      .start();
  }

  *render() {}
}
