import { Converter } from "./converter";
import { ExtraPlugin } from "./extra-plugin";
import { Previewer } from "./previewer";
import { Editor } from "./editor";

export class MarkdownSuperset {
  constructor(converter: Converter) {
  }

  public static init(converter: Converter): MarkdownSuperset {
    return new MarkdownSuperset(converter);
  }

  public installPlugin(plugins: Array<ExtraPlugin>) {

  }
};
