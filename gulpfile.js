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

var release_path = './dist';
var output_path = './output';

gulp.task('build', ['compile', 'uglify']);
gulp.task('compile', shell.task([
  'rm -rf ' + output_path + '/*',
  'tsc --p ./tsconfig.json',
  'cp -R ./src/libs ' + output_path + '/',
]));

gulp.task('uglify', function () {
  var options = {
    mangle: true,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      warnings: true,
      unsafe: false,
      drop_console: true
    }
  };

  del(release_path + '/*');

  return gulp.src(
    [
      // output_path + '/libs/ace-builds/src-noconflict/ace.js',
      // output_path + '/libs/pagedown/Markdown.Converter.js',
      // output_path + '/libs/pagedown/Markdown.Sanitizer.js',
      output_path + '/index.js',
      output_path + '/src/**/*.js'
    ])
    .pipe(concat('markdown-superset.js'))
    .pipe(gulp.dest(release_path))
    .pipe(gulp.dest('./demo/markdown-superset/dist')) // copy to demo
    .pipe(concat('markdown-superset.min.js'))
    .pipe(uglify(options))
    .pipe(gulp.dest(release_path))
    .pipe(gulp.dest('./demo/markdown-superset/dist')) // copy to demo

    ;
});
