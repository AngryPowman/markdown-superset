/// <reference path="typings/index.d.ts" />

import { MarkdownParser } from "./src/markdown-parser";
import { MarkdownExtraPlugin } from "./src/markdown-extra-plugin";
import { MarkdownEditor } from "./src/markdown-editor";
import { MarkdownManager } from "./src/markdown-manager";

namespace MarkdownSuperset {
  // export function init(parser: MarkdownParser): MarkdownManager {
  //   return new MarkdownManager(parser);
  // }

  export const Parser = MarkdownParser;
  export const Editor = MarkdownEditor;
  export const ExtraPlugin = MarkdownExtraPlugin;
  export const Manager = MarkdownManager;
}
