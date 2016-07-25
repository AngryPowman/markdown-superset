/**
 * MarkdownRenderer - Renderer to provide parser extending and token preprocessing
 * Copyright (C) 2016-2048, AngryPowman. (MIT Licensed)
 * https://github.com/AngryPowman/markdown-superset
 */

module MarkdownSuperset {

  type TokenPreprocess = (token: string) => string;

  // Token renderer types
  type TokenRederer = (...args) => string;

  export class MarkdownRenderer {
    private renderer: MarkedRenderer;

    constructor() {
      this.renderer = new marked.Renderer();
      marked.setOptions({
        renderer: this.renderer,
        highlight: this.highlight,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true
      });

      mermaid.initialize({
        startOnLoad: true,
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true
        },
        sequenceDiagram: {
          useMaxWidth: false,
          bottomMarginAdj: 50
        }
      });

      this.overridingRenderer();
      this.initParser();
    }

    public render(text: string): string {
      return marked(text);
    }

    // Call this function after your HTML renderered.
    // Use for updating something need redraw (e.g. Higlighting blocks)
    public update(): void {
      // Update highlight blocks
      $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
      });
      mermaid.init({}, ".mermaid");
    }

    // Use for extending GFM token renderer
    private overridingRenderer(): void {
      this.extendRenderer("ms-code", "code", (token) => {
        return token;
      });
    }

    private highlight(code: string): string {
      return hljs.highlightAuto(code).value;
    }

    private extendRenderer(element: string, rendererFunc: string, preprocess?: TokenPreprocess) {
      let codeTokenRenderer: TokenRederer = this.renderer[rendererFunc];
      this.renderer[rendererFunc] = (...args) => {
        let tokenValue = codeTokenRenderer.apply(this.renderer, args);

        // Preprocessing
        if (preprocess) {
          tokenValue = preprocess(tokenValue);
        }

        // Wrap an outer element
        tokenValue = ["<", element, ">", tokenValue, "</", element, ">"].join("");

        return tokenValue;
      };
    }

    private initParser(): void {

      // Code parser hooks
      // let codeFunc: (code: string, language: string, escaped: boolean) => string = this.renderer.code;
      this.renderer.code = (code: string, language: string, escaped: boolean) => {
        // return codeFunc.apply(this.renderer, [code, language]);

        if (!language) {
          // If code is diagram, render it without highlight
          let diagramPlugin: PluginDiagram = new PluginDiagram();
          if (diagramPlugin.tryParse(code) && MarkdownPluginManager.isPluginExists(diagramPlugin)) {
            return diagramPlugin.renderDiagram(code);
          }
        }

        // If enabled code highlighting
        if (this.renderer.options.highlight) {
          let out = this.renderer.options.highlight(code, language);
          if (out != null && out !== code) {
            escaped = true;
            code = out;
          }
        }

        // If not specified highlighting language
        if (!language) {
          return '<pre class="hljs"><code>'
            + (escaped ? code : this.escape(code, true))
            + '\n</code></pre>';
        }

        return '<pre class="hljs"><code class="'
          + this.renderer.options.langPrefix
          + this.escape(language, true)
          + '">'
          + (escaped ? code : this.escape(code, true))
          + '\n</code></pre>\n';
      };

      // Lexer hooks
      marked.prototype.constructor.Parser.prototype.parse = function (src) {
        this.inline = new marked.InlineLexer(src.links, this.options);
        this.tokens = src.reverse();

        let out = '';
        while (this.next()) {
          out += this.tok();
        }

        // Rendering by plugins
        return MarkdownPluginManager.process(out);
      };
    }

    private escape(html, encode) {
      return html
        .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
  }

  export const Renderer = MarkdownRenderer;
}
