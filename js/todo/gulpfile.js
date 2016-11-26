'use strict'; 
 
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-ruby-sass');

gulp.task("browserify", function() {
	browserify(['./index.js'])
	.transform(
		["babelify"]
	)
	.bundle(function(err, buf) {
		console.log(err);
	})
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./public'));
});

gulp.task('sass', function () {
	return sass('./scss/style.scss', {
			compass: true ,
			style: "compact",
			stopOnError: true
		})
		.on('error', sass.logError)
		.pipe(gulp.dest('./public'));
});

gulp.task("copy", function() {
	gulp.src('./html/**/*').pipe(gulp.dest("./public"));
});

gulp.task("default", ["browserify", "sass", "copy"]);