var gulp = require('gulp');
var babel = require('gulp-babel')
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');

var browserifyConfig = {
  entries: ['./index.js'],
  standalone: 'Flaxs'
};

gulp.task('clean', function(cb) {
  del(['lib/', 'dist/'], cb);
});

gulp.task('lib', function() {
  return gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015', 'stage-0']
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('browserify', ['lib'], function() {
  return browserify(browserifyConfig)
          .bundle()
          .pipe(source('Flaxs.js'))
          .pipe(gulp.dest('./dist/'))
});

gulp.task('publish', ['clean', 'default']);
gulp.task('default', ['lib', 'browserify']);
