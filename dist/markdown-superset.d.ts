/// <reference path="../typings/index.d.ts" />
declare module MarkdownSuperset {
    const Plugins: any;
}
declare module MarkdownSuperset {
    class MarkdownLexing {
        static initilize(): void;
    }
}
declare module MarkdownSuperset {
    class MarkdownPluginManager {
        private static plugins;
        static initPlugins(plugins: Array<MarkdownExtraPlugin>, configs?: Array<{}>): boolean;
        static registerPlugin(plugin: MarkdownExtraPlugin, config?: any): void;
        static initializePlugins(): void;
        static update(): void;
        static renderProcess(markdown: string): string;
        static renderHookProcess(type: string, result: string, args: any[]): string;
        static isPluginExists<T extends MarkdownExtraPlugin>(plugin: T): boolean;
    }
}
declare module MarkdownSuperset {
    class MarkdownRenderer {
        private renderer;
        private sourceLineCount;
        constructor();
        render(makrdown: string): string;
        update(): void;
        private overridingRenderer();
        private highlight(code);
        private extendRenderer(element, rendererFunc, preprocess?);
        private initParser();
        private escape(html, encode);
    }
    const Renderer: typeof MarkdownRenderer;
}
declare module MarkdownSuperset {
    interface MarkdownExtraPlugin {
        config?: {};
        initialize(): void;
        render?(markdown: string): string;
        renderHook(type: string, result: string, args: any[]): string;
        update?(): void;
        tryParse?(code: string): boolean;
        setConfig?(config: {}): any;
    }
}
declare module MarkdownSuperset {
    class PluginDiagram implements MarkdownExtraPlugin {
        initialize(): void;
        render(markdown: string): string;
        update(): void;
        renderHook(type: string, result: string, args: any[]): string;
        tryParse(code: string): boolean;
    }
}
declare module MarkdownSuperset {
    class PluginFormula implements MarkdownExtraPlugin {
        initialize(): void;
        render(markdown: string): string;
        renderHook(type: string, result: string, args: any[]): string;
        update(): void;
    }
}
