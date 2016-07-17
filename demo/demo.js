
$(document).ready(function () {
  console.log("ready!");
  var m = new MarkdownSuperset.Parser();
  var editor = new MarkdownSuperset.Editor();
  editor.initEditor();

  $.get("sample.md", function (data) {
    // $(".result").html(data);
    editor.setValue(data, -1);
    $("#prevewer").html(m.makeHtml(data));//m.makeHtml(data)
  });

  $('').on('scroll', function () {
    $('#prevewer').scrollTop($(this).scrollTop());
  });

  editor.aceEditor.getSession().on('changeScrollTop', function (scroll) {
    $('#prevewer').scrollTop(scroll);
  });

  // console.log(m.makeHtml("<b>Hello World</b>"));
});