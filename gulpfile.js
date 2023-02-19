import browserSync from "browser-sync";
const bsServer = browserSync.create();

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import gulp from "gulp";
const { parallel, series, src, dest, watch } = gulp;

import autoprefixer from "gulp-autoprefixer";
import clean from "gulp-clean";
import cleanCss from "gulp-clean-css";
import concat from "gulp-concat";
import imgMin from "gulp-imagemin";
import uglify from "gulp-uglify";

function cleaner() {
  return src("./dist/*").pipe(clean());
}
function scripts() {
  return src("./src/js/*.js")
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("./dist/js/"))
    .pipe(bsServer.reload({ stream: true }));
}
function styles() {
  return src("./src/scss/style.min.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 3 version"))
    .pipe(cleanCss())
    .pipe(dest("./dist/css/"))
    .pipe(bsServer.reload({ stream: true }));
}
function img() {
  src("./dist/img/*").pipe(clean());
  return src("./src/img/**/*.*")
    .pipe(imgMin())
    .pipe(dest("./dist/img/"))
    .pipe(bsServer.reload({ stream: true }));
}

function watcher() {
  watch("./src/scss/**/*.scss", styles);
  watch("./src/js/*.js", scripts);
  watch("./src/img/**/*.*", img);
  watch("./index.html").on("change", bsServer.reload);
}

function server() {
  bsServer.init({
    server: {
      baseDir: "./",
      browser: "google chrome",
    },
  });
}

export const build = series(cleaner, scripts, styles, img);
export const dev = series(
  cleaner,
  scripts,
  styles,
  img,
  parallel(server, watcher)
);
export default dev;
