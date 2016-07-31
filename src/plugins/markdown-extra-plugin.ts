module MarkdownSuperset {
  export interface MarkdownExtraPlugin {
    config?: {};

    // Initialize a plugin, do some config works
    initialize(): void;

    // Render tokens in the whole markdown content
    // You may parse and replace the tokens you care in the markdown text
    render?(markdown: string): string;

    // Render with block type
    /*
      All the block functions:
        code(code: string, language: string, escaped: boolean): string;
        blockquote(quote: string): string;
        html(html: string): string;
        heading(text: string, level: number, raw: string): string;
        hr(): string;
        list(body: string, ordered: boolean): string;
        listitem(text: string): string;
        paragraph(text: string): string;
        table(header: string, body: string): string;
        tablerow(content: string): string;
        tablecell(content: string, flags: {
            header: boolean,
            align: string
        }): string;
        strong(text: string): string;
        em(text: string): string;
        codespan(code: string): string;
        br(): string;
        del(text: string): string;
        link(href: string, title: string, text: string): string;
        image(href: string, title: string, text: string): string;
        text(text: string): string;
    */
    renderHook(type: string, result: string, args: any[]): string;

    // Update something when did changes 
    update?(): void;

    // Determine whether or not the code valid  
    tryParse?(code: string): boolean;

    // Set plugin config
    setConfig?(config: {});
  }
}
