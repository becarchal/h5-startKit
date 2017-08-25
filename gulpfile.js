var gulp = require('gulp')
var spritesmith = require('gulp.spritesmith')

gulp.task('sprite', function () {
    var spriteData = gulp.src('src/ico/*.png')
        .pipe(spritesmith({
            imgName: './sprite.png',
            retinaImgName: './sprite@2x.png',
            cssName: 'sprite.css',
            retinaSrcFilter: 'src/ico/*@2x.png',
        }))
    return spriteData.pipe(gulp.dest('src/'))
})
