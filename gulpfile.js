var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    notify = require('gulp-notify');

//feedback in terminal on any errors found
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'gulp',
        message: 'Error: <%= error.message %>'
    })

};

gulp.task('scripts', function() {
    gulp.src('./js/script.js')
        .pipe(plumber(plumberErrorHandler))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./build/js'))

});


gulp.task('sass', function() {
    gulp.src('./sass/style.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css')); //minified version is for the browser

});


gulp.task('browser', function() {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(["build/css/*.css", "build/js/*.js"]).on('change', browserSync.reload);
});




//creating named task list that will watch these files
gulp.task('watch', function() {
    gulp.watch('*.html', ['browser']);
    gulp.watch('*.css', ['browser']);
    gulp.watch('js/*.js', ['scripts', 'lint']);
    gulp.watch('sass/*.scss', ['sass']);

});


//corrects syntax errors in js
gulp.task('lint', function() {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src([
            './js/script.js',
            '!node_modules/**'
        ])
        .pipe(plumber())

    .pipe(eslint())

    .pipe(eslint.format())

    .pipe(eslint.failAfterError());
});







gulp.task('default', ['browser', 'watch', 'lint']);