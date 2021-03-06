module MarkdownSuperset {
  export class PluginDiagram implements MarkdownExtraPlugin {
    public initialize(): void {
      mermaid.initialize({
        startOnLoad: true,
        flowchart: {
          useMaxWidth: false
        },
        sequenceDiagram: {
          useMaxWidth: false,
          bottomMarginAdj: 50
        },
        gantt: {
        }
      });
    }

    public render(markdown: string): string {
      console.log("Rendering with diagram ...");
      return markdown;
    }

    public update(): void {
      mermaid.init({}, ".mermaid");
    }

    public renderHook(type: string, result: string, args: any[]): string {
      if (type === "code") {  // Args: $0-code, $1-language
        console.log("Parsing diagram token in code block ...");
        return '<div class="mermaid">' + result + '</div>';
      }

      return result;
    }

    public tryParse(code: string): boolean {
      if (code.match(/^\s*sequenceDiagram/) || code.match(/^\s*graph\s/) || code.match(/^\s*gantt/)) {
        return true;
      }

      return false;
    }
  }

  MarkdownSuperset.Plugins.Diagram = PluginDiagram;
}
