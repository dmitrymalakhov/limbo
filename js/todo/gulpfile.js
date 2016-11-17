'use strict'; 
 
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-ruby-sass');

gulp.task("browserify", function() {
	browserify(['./src/index.js'])
	.transform(
		["babelify", {presets: ["es2015", "react", "stage-1", "stage-2"]}]
	)
	.bundle(function(err, buf) {
		console.log(err);
	})
	.pipe(source('app.js'))
	.pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function () {
	return sass('./src/scss/style.scss', {
			compass: true ,
			style: "compact",
			stopOnError: true
		})
		.on('error', sass.logError)
		.pipe(gulp.dest('./dist/css'));
});

gulp.task("copy", function() {
	gulp.src('./src/html/**/*').pipe(gulp.dest("dist/"));
});

gulp.task("default", ["browserify", "sass", "copy"]);