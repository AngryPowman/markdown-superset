module MarkdownSuperset {
  export class MarkdownParser {
    private converter = new Markdown.Converter();
    constructor() {
    }

    public makeHtml(text: string): string {
      return this.converter.makeHtml(text);
    }
  }

  export const Parser = MarkdownParser;
}
