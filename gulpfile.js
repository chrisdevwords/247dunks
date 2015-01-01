"use strict";

var gulp        = require('gulp');
var usemin      = require('gulp-usemin');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var browserify  = require('browserify');
var templates   = require('browserify-compile-templates');
var source      = require('vinyl-source-stream');
//todo use del instead of rimraf
var rimraf      = require('gulp-rimraf');

// todo add jslint and browsersync/live reload for dev
// todo move dependencies out of bower, using this: 
// https://www.npmjs.com/package/browserify-shim\
// todo figure out a way to run build on heroku so i can .gitignore public/dist
// 
var watchFiles = [
    'app/views/index.src.swig',
    'public/src/js/**/*.js',
    'public/src/scss/**/*.scss',
    'public/src/templates/**/*.html'
];

gulp.task('build:sass', function () {
    return gulp.src('./public/src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/build/css'));
});

gulp.task('build:js', function () {
    return browserify('./public/src/js/main.js', {
        extensions: ['.html']
    })
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./public/build/js'));
});

gulp.task('fix-template', ['minify'], function () {
    return gulp.src('./index.src.swig')
        .pipe(rimraf())
        .pipe(rename("index.swig"))
        .pipe(gulp.dest('app/views'));
});

gulp.task('minify', ['build:js', 'build:sass'], function () {
   return gulp.src('app/views/index.src.swig')
        .pipe(usemin({
            assetsDir: './',
            css: [minifyCss(), 'concat'],
            js: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
    var generated = ['public/dist', 'app/views/index.swig'];
    return gulp.src(generated)
        .pipe(rimraf());
});

gulp.task('dev', ['clean'], function () {
    gulp.src('app/views/index.src.swig')
        .pipe(rename('index.swig'))
        .pipe(gulp.dest('app/views'));
});

gulp.task('watch:dev', ['dev', 'build:js', 'build:sass'], function(){
    gulp.watch(watchFiles, ['dev', 'build:js', 'build:sass']);
});

gulp.task('watch:build', ['build'], function() {
    gulp.watch(watchFiles, ['build']);
});

gulp.task('build', ['minify', 'fix-template']);

gulp.task('default', ['watch:dev']);