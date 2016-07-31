
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
    deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
      args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

$(document).ready(function () {
  var editor = ace.edit("editor");
  document.getElementById('editor').style.fontSize = '14px';

  editor.setTheme("ace/theme/github");
  editor.session.setMode("ace/mode/markdown");
  editor.setReadOnly(false);
  editor.session.setUseWrapMode(false);
  editor.setScrollSpeed(1.3);

  MarkdownSuperset.MarkdownPluginManager.initPlugins([
    new MarkdownSuperset.PluginDiagram(),
    new MarkdownSuperset.PluginFormula()
  ]);


  var renderer = new MarkdownSuperset.Renderer();

  $.get("sample.md", function (data) {
    editor.setValue(data, -1);
    $("#previewer").html(renderer.render(data));
  });

  editor.session.on('change',
    // throttling every function calls
    throttle(
      function () {
        $("#previewer").html(renderer.render(editor.getValue()));
        renderer.update();
      }, 100)
  );

  editor.session.on('changeScrollTop', function (scroll) {
    $('#previewer').scrollTop(scroll);
  });
});
