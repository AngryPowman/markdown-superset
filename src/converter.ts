import { ExtraPlugin } from "./extra-plugin";

export class Converter {
  private _activePlugins: Array<Plugin>;
  constructor(dom: string, activePlugins?: Array<Plugin>) {
    this._activePlugins = activePlugins;
  }

  public registerPlugin(plugin: Plugin) {

  }

  public makeHtml(text: string): string {
    return "";
  }
}
