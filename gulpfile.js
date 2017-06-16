const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('default', () =>
	gulp.src('dist/*')
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('./'))
);