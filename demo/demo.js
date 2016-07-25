
$(document).ready(function () {
  console.log("ready!");
  var renderer = new MarkdownSuperset.Renderer();
  var editor = new MarkdownSuperset.Editor();
  editor.initEditor();

  MarkdownSuperset.MarkdownPluginManager.initPlugins([
    new MarkdownSuperset.PluginDiagram()
  ]);

  $.get("sample.md", function (data) {
    editor.setValue(data, -1);
    $("#previewer").html(renderer.render(data));
  });

  editor.aceEditor.getSession().on('change', (e) => {
    $("#previewer").html(renderer.render(editor.getValue()));
    renderer.update();
  });

  editor.aceEditor.getSession().on('changeScrollTop', function (scroll) {
    $('#previewer').scrollTop(scroll);
  });
});
