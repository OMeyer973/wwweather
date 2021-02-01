const del = require('del');
const gulp = require('gulp');

const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

const htmlPath = 'src/**/*.html'
const imgPath = 'src/img/*'
const vectorPath = 'src/vector/*'
const scriptPath = 'src/script/**/*.js'
const stylePath = 'src/style/**/*.css'
const fontPath = 'src/font/*'

function cleanTask() {
    return del(['./dist/', './.publish']);
}

function htmlTask() {
    return gulp.src(htmlPath)
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function imgTask() {
    return gulp.src(imgPath)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}

function vectorTask() {
    return gulp.src(vectorPath)
        .pipe(gulp.dest('dist/vector'))
        .pipe(browserSync.stream());
}

function jsTask() {
    return gulp.src(scriptPath)
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(browserify({ debug : true }))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
}

function cssTask() {
    return gulp.src(stylePath)
      .pipe(sourcemaps.init())
      .pipe(concat('style.css'))
      .pipe(postcss([autoprefixer(), cssnano()])) //not all plugins work with postcss only the ones mentioned in their documentation
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream());
}

function fontTask() {
    return gulp.src(fontPath)
        .pipe(gulp.dest('dist/font'))
        .pipe(browserSync.stream());
}

const buildTask = gulp.parallel(htmlTask, imgTask, vectorTask, jsTask, cssTask, fontTask);

function watchTask() {
    gulp.watch(htmlPath, { interval: 500 }, htmlTask).on('change', browserSync.reload);
    gulp.watch(imgPath, { interval: 500 }, imgTask).on('change', browserSync.reload);
    gulp.watch(vectorPath, { interval: 500 }, vectorTask).on('change', browserSync.reload);
    gulp.watch(scriptPath, { interval: 500 }, jsTask).on('change', browserSync.reload);
    gulp.watch(stylePath, { interval: 500 }, cssTask).on('change', browserSync.reload);
    gulp.watch(fontPath, { interval: 500 }, fontTask).on('change', browserSync.reload);
}

function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
}

function ghPagesTask() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages ({
        remoteUrl: 'https://github.com/OMeyer973/kiteweather.git',
        branch: 'gh-pages'
    }));
};

exports.clean = cleanTask;
exports.build = buildTask;
exports.watch = exports.default = gulp.series(buildTask, gulp.parallel(watchTask, browserSyncTask));
exports.deploy = gulp.series(buildTask, ghPagesTask);
