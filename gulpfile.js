'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var flatten = require('gulp-flatten');
var browserSync = require('browser-sync').create();
var karma = require('karma');

var watching = false;

// Tasks
gulp.task('default', function(cb) {
  runSequence('watch', 'serve', cb);
});

gulp.task('watch', ['build'], function() {
  var opts = {interval: 100, mode: 'poll'};

  watching = true;

  gulp.watch(['src/index.html'], opts, ['index']);
  gulp.watch(['src/content/**/*'], opts, ['assets']);
  gulp.watch(['src/app/**/*.html'], opts, ['templates']);
  gulp.watch(['src/app/**/*.sass', 'src/app/**/*.scss'], opts, ['styles']);
  gulp.watch(['src/app/**/*.js'], opts, ['scripts']);
});

gulp.task('build', function(cb) {
  runSequence('clean', 'assets', 'icons', 'styles', 'scripts', 'templates', 'index', cb);
});

gulp.task('clean', function() {
  var del = require('del');

  return del(['www/app', 'www/content']);
});

gulp.task('assets', function() {
  return gulp.src('src/content/**/*')
    .pipe(gulp.dest('www/content'));
});

gulp.task('icons', function() {
  return gulp.src('node_modules/material-design-icons/*/svg/production/*')
    .pipe(flatten({includeParents: 1}))
    .pipe(gulp.dest('www/content/icons/material'));
});

gulp.task('index', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('www'));
});

gulp.task('styles', function() {
  var sass = require('gulp-sass');

  return gulp.src(['src/app/**/*.sass', 'src/app/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', onError))
    .pipe(sourcemaps.write('.', {sourceRoot: '../src/app'}))
    .pipe(gulp.dest('www/app'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', function() {
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var order = require('gulp-order');

  return gulp.src('src/app/**/!(*.spec).js')
    .pipe(order(['**/*.module.js', '**/*.js']))
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.', {sourceRoot: '../src/app'}))
    .pipe(gulp.dest('www/app'));
});

gulp.task('templates', function() {
  return gulp.src('src/app/**/*.html')
    .pipe(gulp.dest('www/app'));
});

gulp.task('serve', function() {
  var fallback = require('connect-history-api-fallback');

  browserSync.init({
    server: {
      baseDir: './www',
      middleware: [fallback()]
    }
  });
});

gulp.task('tdd', ['default'], function(cb) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js'
  }, cb).start();
});

// Helpers
function onError(e) {
  gutil.log(gutil.colors.red('Error in plugin'), '\'' + gutil.colors.cyan(e.plugin) + '\'');

  console.log('Message:');
  console.log(e.message);

  if (watching) {
    this.emit('end');
  } else {
    throw e;
  }
}
