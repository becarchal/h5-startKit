var gulp = require('gulp');
var tinypng = require('gulp-tinypng');

gulp.task('default', function () {
	gulp.src('dist/img/**/*.png')
		.pipe(tinypng('gZAIYG-mATCSCAUFgn7RNwV2RG44wvHX'))
		.pipe(gulp.dest('dist/img'));
});
