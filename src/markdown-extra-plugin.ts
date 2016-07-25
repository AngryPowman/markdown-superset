module MarkdownSuperset {
  export interface MarkdownExtraPlugin {
    config?: {};

    // Initialize a plugin, do some config works
    initialize(): void;

    // Render tokens in the whole markdown content
    // You may parse and replace the tokens you care in the markdown text
    render?(markdown: string): string;

    // Render the code (The ``` block)
    renderCode?(code: string): string;

    // Update something when did changes 
    update?(): void;

    // Determine whether or not the code valid  
    tryParse?(code: string): boolean;

    // Set plugin config
    setConfig?(config: {});
  }
}
