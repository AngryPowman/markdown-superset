module MarkdownSuperset {
  export interface MarkdownExtraPlugin {
    render(markdown: string): string;
  }

  // export const ExtraPlugin = MarkdownExtraPlugin;
}
