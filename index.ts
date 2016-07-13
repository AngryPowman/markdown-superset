/// <reference path="typings/index.d.ts" />

import { Converter } from "./src/converter";
import { Plugin } from "./src/plugin";
import { Editor } from "./src/editor";
import { Previewer } from "./src/previewer";
import { Markdown } from "./src/markdown";

export const MarkdownSuperset = {
  // Converter,
  // Plugin,
  // Editor,
  // Previewer,
  // Markdown,
  init(converter: Converter): Markdown {
    return new Markdown(converter);
  }
};



// export type Converter = Converter;
// export type Plugin = Plugin;
// export type Editor = Editor;
// export type Previewer = Previewer;
// export type Markdown = Markdown;
