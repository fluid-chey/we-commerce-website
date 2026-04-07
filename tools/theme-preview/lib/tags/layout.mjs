import { Tag } from "liquidjs";

export class LayoutTag extends Tag {
  constructor(token, remainTokens, liquid) {
    super(token, remainTokens, liquid);
    const markup = token.args.trim();
    const m = markup.match(/['"]([^'"]+)['"]/);
    this.layoutName = m ? m[1].toLowerCase() : null;
  }

  *render() {}

  getLayoutName() {
    return this.layoutName === "none" ? null : this.layoutName;
  }
}
