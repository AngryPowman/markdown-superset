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
    private sourceLineCount: number = 0;

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
        startOnLoad: false
      });
      MarkdownPluginManager.initializePlugins();

      MarkdownLexing.initilize();
      this.overridingRenderer();
      this.initParser();
    }

    public render(makrdown: string): string {
      return marked(makrdown);
    }

    // Call this function after your HTML renderered.
    // Use for updating something need redraw (e.g. Higlighting blocks)
    public update(): void {

      // Update highlight blocks
      if (this.renderer.options.highlight) {
        $('pre code').each(function (i, block) {
          hljs.highlightBlock(block);
        });
      }

      // Update all plugins 
      MarkdownPluginManager.update();
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
      this.renderer.code = (code: string, language: string, escaped: boolean) => {
        if (!language) {
          // If code is diagram, render it without highlighter
          let diagramPlugin: PluginDiagram = new PluginDiagram();
          if (diagramPlugin.tryParse(code) && MarkdownPluginManager.isPluginExists(diagramPlugin)) {
            return diagramPlugin.renderHook("code", code, [code, language]);
          }
        }

        if (language === "math") {
          return new PluginFormula().renderHook("code", code, [code, language]);;
        }

        // If enabled code highlighting
        if (this.renderer.options.highlight) {
          let out = this.renderer.options.highlight(code, language);
          if (out != null && out !== code) {
            escaped = true;
            code = out;
          }

          // If not specified highlighting language
          if (!language) {
            return [
              '<pre class="hljs"><code>',
              (escaped ? code : this.escape(code, true)),
              '\n</code></pre>\n'].join("");
          }

          return [
            '<pre class="hljs"><code class="',
            this.renderer.options.langPrefix, this.escape(language, true),
            '">',
            (escaped ? code : this.escape(code, true)),
            '\n</code></pre>\n'].join("");

        } else {
          return ['<pre class="hljs"><code>', code, '</code></pre>\n'].join("");
        }
      };


      let renderHooks: Array<any> = [
        // "code",  /* Implement alone*/
        "blockquote",
        "html",
        "heading",
        "hr",
        "list",
        "listitem",
        "paragraph",
        "table",
        "tablerow",
        "tablecell",
        "strong",
        "em",
        "codespan",
        "br",
        "del",
        "link",
        "image",
        "text"
      ];

      renderHooks.forEach(functionName => {
        let hookFunc: any = this.renderer[functionName];
        this.renderer[functionName] = (...args) => {
          let result: string = hookFunc.apply(this.renderer, args);
          // let sourceLine = args[args.length - 1];

          // // Insert source-line
          // if (sourceLine && Number(sourceLine) > 0) {
          //   let element = $(result);
          //   if (element.length > 0) {
          //     element[0].setAttribute("source-line", sourceLine);
          //     result = element.wrapAll('<div>').parent().html();
          //   }
          // }

          return MarkdownPluginManager.renderHookProcess(functionName, result, args);
        };
      }, this);

      // Lexer hooks
      marked.prototype.constructor.Parser.prototype.parse = function (src) {
        this.inline = new marked.InlineLexer(src.links, this.options);
        this.tokens = src.reverse();

        let out = '';

        // Parsing with GFM parser
        while (this.next()) {
          out += this.tok();
        }

        // Render by plugins
        return out;
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
