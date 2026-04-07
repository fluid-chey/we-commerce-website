import { Tag } from "liquidjs";

export class PaginateTag extends Tag {
  constructor(token, remainTokens, liquid, parser) {
    super(token, remainTokens, liquid);
    this._parseMarkup(token.args.trim());
    this.templates = [];
    const stream = parser.parseStream(remainTokens);
    stream
      .on("tag:endpaginate", () => stream.stop())
      .on("template", (tpl) => this.templates.push(tpl))
      .on("end", () => {
        throw new Error(`paginate tag not closed: ${token.getText()}`);
      })
      .start();
  }

  _parseMarkup(markup) {
    const m = markup.match(/^(.+?)\s+by\s+(\d+)/);
    if (!m) {
      throw new Error(`paginate: invalid syntax "${markup}"`);
    }
    this.collectionExpr = m[1].trim();
    this.pageSize = parseInt(m[2], 10);
  }

  *render(ctx, emitter) {
    const cfg = this.liquid.previewConfig;
    const currentPage = cfg.currentPage || 1;
    const collection = ctx.get(this.collectionExpr.split("."));
    const items = Array.isArray(collection) ? collection : [];
    const totalItems = items.length;
    const pageSize = this.pageSize;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const page = Math.max(1, Math.min(currentPage, totalPages));
    const offset = (page - 1) * pageSize;
    const sliced = items.slice(offset, offset + pageSize);

    const parts = [];
    for (let i = 1; i <= totalPages; i++) {
      parts.push({
        title: String(i),
        url: `?page_num=${i}`,
        is_link: i !== page,
      });
    }

    const paginate = {
      current_page: page,
      current_offset: offset + 1,
      end_offset: Math.min(offset + pageSize, totalItems),
      items: totalItems,
      parts,
      pages: totalPages,
      page_size: pageSize,
      previous: page > 1
        ? { title: "Previous", url: `?page_num=${page - 1}`, is_link: true }
        : null,
      next: page < totalPages
        ? { title: "Next", url: `?page_num=${page + 1}`, is_link: true }
        : null,
    };

    const collPath = this.collectionExpr.split(".");
    const overrideKey = collPath[collPath.length - 1];

    ctx.push({ paginate, [overrideKey]: sliced });
    try {
      yield this.liquid.renderer.renderTemplates(this.templates, ctx, emitter);
    } finally {
      ctx.pop();
    }
  }
}
