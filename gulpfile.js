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

var release_path = './dist';
var output_path = './output';

gulp.task('build', ['compile', 'uglify', 'copy-to-demo']);
gulp.task('build-no-uglify', gulpsync.async(['compile', 'copy-to-demo']));

gulp.task('compile', shell.task([
  'rm -rf ' + output_path + '/*',
  'tsc --p ./tsconfig.json',
  'cp -R ./src/libs ' + output_path + '/',
]));

gulp.task('uglify', ['compile'], function () {
  var options = {
    mangle: true,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: false,
      warnings: false,
      unsafe: false,
      drop_console: true
    }
  };


  del.sync(release_path + '/*');
  return gulpsync.sync(
    gulp.src(output_path + '/libs/highlight.js/styles/*.css')
      .pipe(gulp.dest(release_path + '/styles/')),
    gulp
      .src(
      [
        'node_modules/marked/lib/marked.js',
        'node_modules/mermaid/dist/mermaid.min.js',
        output_path + '/libs/highlight.js/highlight.pack.js',
        output_path + '/all.js',
        output_path + '/index.js'
      ])
      // .pipe(babel({
      //   presets: ['es2015']
      // }))
      .pipe(concat('markdown-superset.js'))
      .pipe(gulp.dest(release_path))

      .pipe(concat('markdown-superset.min.js'))
      .pipe(uglify(options))
      .pipe(gulp.dest(release_path))
  );
});

gulp.task('copy-to-demo', ['compile', 'uglify'], shell.task([
  'rm -rf ./demo/markdown-superset/*',
  'sleep 1',  // ensure the files wrote to the disk 
  'cp -R ' + release_path + '/ ./demo/markdown-superset',
]));