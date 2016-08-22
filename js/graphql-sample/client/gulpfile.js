'use strict'; 
 
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-ruby-sass');

gulp.task("browserify", function() {
  browserify(['./src/app.jsx'])
  .transform(
    ["babelify", {presets: ["es2015", "react", "stage-1", "stage-2"]}]
  )
  .bundle(function(err, buf) {
    console.log(err);
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest('./dist/js/'));
});

gulp.task("copy", function() {
  gulp.src('./src/html/**/*').pipe(gulp.dest("dist/"));
});

gulp.task("default", ["browserify", "copy"]);