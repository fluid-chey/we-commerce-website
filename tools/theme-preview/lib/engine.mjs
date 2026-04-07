import { Liquid } from "liquidjs";

import { SchemaTag } from "./tags/schema.mjs";
import { StyleTag } from "./tags/style.mjs";
import { LayoutTag } from "./tags/layout.mjs";
import { SectionTag } from "./tags/section.mjs";
import { RenderTag } from "./tags/render.mjs";
import { FormTag } from "./tags/form.mjs";
import { PaginateTag } from "./tags/paginate.mjs";
import { MacroTag, MacroCallTag } from "./tags/macro.mjs";
import { JavascriptTag } from "./tags/javascript.mjs";
import { SectionsTag } from "./tags/sections.mjs";

import { registerAssetFilters } from "./filters/asset.mjs";
import { registerTranslateFilter } from "./filters/translate.mjs";
import { registerHtmlFilters } from "./filters/html.mjs";
import { registerStyleFilters } from "./filters/style.mjs";
import { registerFormatFilters } from "./filters/format.mjs";

export function createEngine({ themeRoot, repoRoot, context, locales, settings }) {
  const liquid = new Liquid({
    strictFilters: false,
    strictVariables: false,
    ownPropertyOnly: false,
  });

  liquid.previewConfig = {
    themeRoot,
    repoRoot,
    context,
    locales,
    settings,
    locale: "en",
    currentPage: 1,
  };

  liquid._macros = {};

  liquid.registerTag("schema", SchemaTag);
  liquid.registerTag("style", StyleTag);
  liquid.registerTag("layout", LayoutTag);
  liquid.registerTag("section", SectionTag);
  liquid.registerTag("render", RenderTag);
  liquid.registerTag("form", FormTag);
  liquid.registerTag("paginate", PaginateTag);
  liquid.registerTag("macro", MacroTag);
  liquid.registerTag("macro_call", MacroCallTag);
  liquid.registerTag("javascript", JavascriptTag);
  liquid.registerTag("sections", SectionsTag);

  registerAssetFilters(liquid, themeRoot, repoRoot);
  registerTranslateFilter(liquid, locales, "en");
  registerHtmlFilters(liquid);
  registerStyleFilters(liquid);
  registerFormatFilters(liquid);

  return liquid;
}
