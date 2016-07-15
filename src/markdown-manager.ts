module MarkdownSuperset {

  export class MarkdownManager {
    private _activePlugins: Array<MarkdownExtraPlugin>;

    constructor(parser: MarkdownParser) {
    }

    public registerPlugin(plugin: MarkdownExtraPlugin) {
      if (!this._activePlugins.indexOf(plugin)) {
        this._activePlugins.push(plugin);
      }
    }

    public registerPlugins(plugins: Array<MarkdownExtraPlugin>) {

    }
  };

  export const Parser = MarkdownParser;
}

