/// <reference path="typings/globals/jquery/index.d.ts" />

import { Converter } from "./src/converter";
import { ExtraPlugin } from "./src/extra-plugin";
import { Editor } from "./src/editor";
import { MarkdownSupersetImpl } from "./src/markdown-superset";

export const MarkdownSuperset = {
  Converter,
  Plugin,
  Editor,
  init(element: string, plugins?: Array<ExtraPlugin>): MarkdownSupersetImpl {
    return new MarkdownSupersetImpl(element, plugins);
  }
};
