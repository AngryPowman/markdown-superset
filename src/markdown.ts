import { Converter } from "./converter";
import { Plugin } from "./plugin";
import { Previewer } from "./previewer";
import { Editor } from "./editor";

export class Markdown {
  private _activePlugins: Array<Plugin>;

  constructor(converter: Converter) {
  }

  public registerPlugin(plugin: Plugin) {
    if (!this._activePlugins.indexOf(plugin)) {
      this._activePlugins.push(plugin);
    }
  }

  public registerPlugins(plugins: Array<Plugin>) {

  }
};


