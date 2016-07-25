/**
 * MarkdownPluginManager - Extra markdown plugins manager
 * Copyright (C) 2016-2048, AngryPowman. (MIT Licensed)
 * https://github.com/AngryPowman/markdown-superset
 */

module MarkdownSuperset {

  export class MarkdownPluginManager {
    private static plugins: Array<MarkdownExtraPlugin> = [];
    public static initPlugins(plugins: Array<MarkdownExtraPlugin>) {
      this.plugins = plugins;
    }

    // Register a plugin
    public static registerPlugin(plugin: MarkdownExtraPlugin) {
      // Not allow the same type of plugins in the list
      if (this.isPluginExists(plugin)) {
        return;
      }

      this.plugins.push(plugin);
    }

    // Rendering processer
    public static process(markdown: string): string {
      let markdownRendered: string = markdown;
      this.plugins.forEach(plugin => {
        markdownRendered = plugin.render(markdownRendered);
      });

      return markdownRendered;
    }

    public static isPluginExists<T extends MarkdownExtraPlugin>(plugin: T): boolean {
      return this.plugins.every(element => {
        if (typeof element === typeof plugin) {
          return true;
        }
      });
    }


  }
}
