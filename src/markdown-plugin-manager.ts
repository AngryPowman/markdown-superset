/**
 * MarkdownPluginManager - Extra markdown plugins manager
 * Copyright (C) 2016-2048, AngryPowman. (MIT Licensed)
 * https://github.com/AngryPowman/markdown-superset
 */

module MarkdownSuperset {

  export class MarkdownPluginManager {
    private static plugins: Array<MarkdownExtraPlugin> = [];
    public static initPlugins(plugins: Array<MarkdownExtraPlugin>, configs?: Array<{}>): boolean {
      if (configs && (plugins.length !== configs.length)) {
        return false;
      }

      this.plugins = plugins;

      if (configs) {
        for (let i = 0; i < this.plugins.length; ++i) {
          this.plugins[i].setConfig(configs[i]);
        }
      }

      return true;
    }

    // Register a plugin
    public static registerPlugin(plugin: MarkdownExtraPlugin, config?: any) {
      // Not allow the same type of plugins in the list
      if (this.isPluginExists(plugin)) {
        return;
      }

      if (config) {
        plugin.setConfig(config);
      }
      this.plugins.push(plugin);
    }

    // Initialize all plugins, must be call after you register plugins
    public static initializePlugins(): void {
      this.plugins.forEach(plugin => {
        plugin.initialize();
      });
    }

    // Update all plugin
    public static update() {
      this.plugins.forEach(plugin => {
        plugin.update();
      });
    }

    // Rendering processer
    public static renderProcess(markdown: string): string {
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
