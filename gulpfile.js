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

var release_path = './dist';
var output_path = './output';

gulp.task('build', ['compile', 'uglify', 'copy-to-demo']);
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

  del(release_path + '/*');

  return gulp.src(
    [
      output_path + '/libs/ace-builds/src-noconflict/ace.js',
      output_path + '/libs/pagedown/Markdown.Converter.js',
      output_path + '/libs/pagedown/Markdown.Sanitizer.js',
      output_path + '/src/**/*.js',
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
});

gulp.task('copy-to-demo', ['compile', 'uglify'], function () {
  del('./demo/markdown-superset/*');
  return gulp.src(
    [
      release_path + '/markdown-superset.js',
      release_path + '/markdown-superset.min.js'
    ])
    .pipe(gulp.dest('./demo/markdown-superset')) // copy to demo
});