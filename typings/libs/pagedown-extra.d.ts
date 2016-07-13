// Type definitions for pagedown
// Definitions by: AngryPowman

declare namespace Markdown {
  export interface Hooks {
    chain(name: string, excute: (text: string, callback) => any);
  }

  export interface Converter {
    hooks: Hooks;
    makeHtml(text: string): string;
  }

  var Converter: {
    new (): Converter;
  }

  export interface Extra {
    init(converter: Converter, options?: any);
  }

  var Extra: {
    init(converter: Converter, options?: any);

  }

}

declare namespace Pagedown {
  type MarkdownConverter = Markdown.Converter;
  type MarkdownExtra = Markdown.Extra;
}

