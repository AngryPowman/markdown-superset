module MarkdownSuperset {
  export class MarkdownEditor {
    public aceEditor: AceAjax.Editor;
    constructor() {

    }

    public initEditor(dom = "editor") {
      this.aceEditor = ace.edit(dom);
      this.aceEditor.setTheme("ace/theme/chrome");
      this.aceEditor.getSession().setMode("ace/mode/markdown");
      this.aceEditor.setReadOnly(false);
      this.aceEditor.session.setUseWrapMode(false);
      this.aceEditor.setScrollSpeed(1);
      this.aceEditor.setFontSize("16px");

      this.aceEditor.getSession().on('change', (e) => {

      });
    }

    public setValue(val: string, cursorPos: number) {
      this.aceEditor.setValue(val, cursorPos);
    }
  }

  export const Editor = MarkdownEditor;
}
