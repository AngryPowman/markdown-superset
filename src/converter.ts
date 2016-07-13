import { Plugin } from "./plugin";

export class Converter {
  private converter: Pagedown.MarkdownConverter;
  constructor() {
  }

  public makeHtml(text: string): string {
    return this.converter.makeHtml(text);
  }
}
