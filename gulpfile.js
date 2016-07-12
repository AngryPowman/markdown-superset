var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var shell = require('gulp-shell')

gulp.task('release', ['compile', 'compress-js', 'copy-libs']);
gulp.task('compile', shell.task(['tsc --p ./tsconfig.json']));

gulp.task('compress-js', function () {
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

  var release_path = './dist';
  var output_path = './output';

  del(release_path + '/*');

  return gulp.src(output_path + '/**/*.js')
    .pipe(uglify(options))
    .pipe(concat('markdown-superset.min.js'))
    .pipe(gulp.dest(release_path));
});

gulp.task('copy-libs', function () {
});