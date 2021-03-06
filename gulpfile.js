var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var shell = require('gulp-shell')
var gulpCopy = require('gulp-copy');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var gulpsync = require('gulp-sync')(gulp);
var runSequence = require('run-sequence');

var release_path = './dist';
var output_path = './output';

gulp.task('build', function() {
  runSequence('build-before-clean', 'compile', ['uglify', 'output'], /*'copy-to-demo',*/ 'build-after-clean');
});

gulp.task('build-before-clean', function() {
  return del(release_path + '/*');
});

gulp.task('build-after-clean', function() {

});

var styleDest = release_path + '/styles'
var typingsDest = release_path + '/typings'
var highlightDest = styleDest + '/highlight.js';
gulp.task('output', shell.task(
  [
    // Create if destination not exists
    'test -d ' + highlightDest + ' || mkdir -p ' + highlightDest,
    'test -d ' + styleDest + '/mermaid || mkdir -p ' + styleDest + '/mermaid',
    'test -d ' + styleDest + '/katex || mkdir -p ' + styleDest + '/katex',

    // Copy
    'cp -R ' + 'src/libs/highlight.js/styles/ ' + highlightDest,
    'cp -R ' + 'node_modules/mermaid/dist/mermaid.css ' + styleDest + '/mermaid',
    'cp -R ' + 'node_modules/mermaid/dist/mermaid.dark.css ' + styleDest + '/mermaid',
    'cp -R ' + 'node_modules/mermaid/dist/mermaid.forest.css ' + styleDest + '/mermaid',
    'cp -R ' + 'node_modules/katex/dist/katex.min.css ' + styleDest + '/katex',
    'cp -R ' + 'node_modules/katex/dist/fonts ' + styleDest + '/katex'
  ],


  { verbose: true, timeout: 10000 }));

gulp.task('compile', shell.task([
  'tsc --p ./tsconfig.json',
  // 'cp -R ./src/libs ' + output_path + '/',
], { verbose: true, timeout: 100000 }));

gulp.task('uglify', function() {
  var options = {
    mangle: true,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: false,
      if_return: true,
      join_vars: true,
      warnings: true,
      unsafe: false,
      drop_console: true
    }
  };


  return gulp.src(
      [
        'node_modules/marked/lib/marked.js',
        'node_modules/mermaid/dist/mermaid.min.js',
        'node_modules/katex/dist/katex.min.js',
        'src/libs/highlight.js/highlight.pack.js',
        release_path + '/markdown-superset.js',
        release_path + '/index.js'
      ])
    // .pipe(babel({
    //   presets: ['es2015']
    // }))
    .pipe(concat('markdown-superset.js'))
    .pipe(gulp.dest(release_path))

  .pipe(concat('markdown-superset.min.js'))
    .pipe(uglify(options))
    .pipe(gulp.dest(release_path))
});

gulp.task('copy-to-demo', shell.task([
  'cp -R ' + release_path + '/ ./demo/libs/markdown-superset',
], { verbose: true, timeout: 10000 }));