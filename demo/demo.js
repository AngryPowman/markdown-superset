
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
  console.log("ready!");
  var editor = new MarkdownSuperset.Editor();
  editor.initEditor();

  MarkdownSuperset.MarkdownPluginManager.initPlugins([
    new MarkdownSuperset.PluginDiagram()
  ]);

  var renderer = new MarkdownSuperset.Renderer();

  $.get("sample.md", function (data) {
    editor.setValue(data, -1);
    $("#previewer").html(renderer.render(data));
  });

  editor.aceEditor.getSession().on('change',
    // throttling every function calls
    throttle(function () {
      $("#previewer").html(renderer.render(editor.getValue()));
      renderer.update();
    }, 100)
  );

  editor.aceEditor.getSession().on('changeScrollTop', function (scroll) {
    $('#previewer').scrollTop(scroll);
  });
});
