/// <reference path="../exports.ts" />

module MarkdownSuperset {
  export class PluginDiagram implements MarkdownExtraPlugin {

    public render(markdown: string): string {
      console.log("Rendering with diagram ...");
      return markdown;
    }

    public renderDiagram(code: string): string {
      console.log("Parsing diagram token in code block ...");
      return '<div class="mermaid">' + code + '</div>';
    }

    public tryParse(code: string): boolean {
      if (code.match(/^sequenceDiagram/) || code.match(/^graph/)) {
        return true;
      }

      return false;
    }
  }

  MarkdownSuperset.Plugins.Diagram = PluginDiagram;
}
