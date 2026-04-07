import { Tag } from "liquidjs";

export class SectionsTag extends Tag {
  constructor(token, remainTokens, liquid) {
    super(token, remainTokens, liquid);
    this.sectionName = token.args.trim().replace(/['"]/g, "");
  }

  *render() {}
}
