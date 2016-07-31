module MarkdownSuperset {
  export class PluginFormula implements MarkdownExtraPlugin {
    public initialize(): void {

    }

    public render(markdown: string): string {
      return markdown;
    }

    public renderHook(type: string, result: string, args: any[]): string {

      // Inline math
      if (type === "codespan") {  // Args: $0-inline code
        let inlineCode = args[0];
        if (inlineCode && inlineCode.match(/\$(.*)\$/)) {
          try {
            return katex.renderToString(inlineCode.replace(/\$/g, ""));
          } catch (e) {
            return result;
          }
        }
        return result;
      } else if (type === "code" && args[1] === "math") { // Args: $0-code, $1-language
        let code = args[0];
        try {
          return katex.renderToString(code, { displayMode: true });
        } catch (e) {
          return result;
        }
      }

      return result;
    }

    public update(): void {

    }
  }

  MarkdownSuperset.Plugins.Fumula = PluginFormula;
}
