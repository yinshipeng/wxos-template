var gulp = require('gulp')
var rename = require('gulp-rename')
var clean = require('gulp-clean')

const CONSTANTS_FILE_PATH = __dirname + '/src/config/constants.js'
const CONSTANTS_FILE_PATH_COPY = CONSTANTS_FILE_PATH + '.copy'

gulp.task('copy1', function () {
    return gulp.src('dist/views/**/*.weex.js')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('dist/dest'))
})

gulp.task('delConstants', function () {
    return gulp.src(CONSTANTS_FILE_PATH, {read: false})
        .pipe(clean())
})

gulp.task('renameConstants', function () {
    return gulp.src(CONSTANTS_FILE_PATH_COPY)
        .pipe(rename({
            basename: 'constants',
            extname: '.js'
        }))
        .pipe(gulp.dest(__dirname + '/src/config'))
})

gulp.task('delConstantsBak', function () {
    return gulp.src(CONSTANTS_FILE_PATH_COPY, {read: false})
        .pipe(clean())
})

gulp.task('default', ['copy1', 'delConstants', 'renameConstants', 'delConstantsBak'], function () {
    console.log('/dist/dest目录生成完毕！！！！！')
})
