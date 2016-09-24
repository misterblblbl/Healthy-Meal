"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var server = require("browser-sync");
var clean = require("gulp-clean");
var runSequence = require('gulp-run-sequence');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rigger = require('gulp-rigger');

//Собрать стилевой файл, добавить префиксы,
// скомбинировать медиа-вырадения, минифицировать файл
gulp.task("style", function() {
    return gulp.src("less/style.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({browsers: [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
            ]}),
            mqpacker({
                sort: true
            })
        ]))
        .pipe(gulp.dest("docs/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("docs/css"));
});

//Скопировать изображения
gulp.task("copy:images", function() {
    return gulp.src("img/*.{png,jpg,svg,webp}")
        .pipe(gulp.dest("docs/img"));
});

gulp.task('js:build', function () {
    gulp.src('js/main.js') //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest('docs/js')); //Выплюнем готовый файл в build
    // .pipe(reload({stream: true})); //И перезагрузим сервер
});

//Скопировать щрифты
gulp.task("copy:fonts", function() {
    return gulp.src("fonts/**/*.{woff,woff2,eot}")
        .pipe(gulp.dest("docs/fonts"))
});

//Скопировать html-файлы
gulp.task("copy:html", function() {
    return gulp.src("*.html")
        .pipe(gulp.dest("docs"));
});

//Очистить папку build при повторной сборке
gulp.task("clean", function () {
    return gulp.src("docs", {read: false})
        .pipe(clean({force: true}))
});

//Собрать проект
gulp.task("build", function() {
    runSequence(
        "clean",
        "copy:fonts",
        "copy:html",
        "copy:images",
        "style",
        "js:build"
    );
});

gulp.task("serve", function() {
    server.init({
        server: "docs",
        notify: false,
        open: true,
        ui: false
    });

    gulp.watch("js/*.js", ["js"]);
    gulp.watch("less/*.less", ["style"]);
    gulp.watch("*.html", ["copy:html"]);
});

gulp.task('default', ['build']);