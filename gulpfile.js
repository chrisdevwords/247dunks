"use strict";

var gulp        = require('gulp');
var usemin      = require('gulp-usemin');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
//todo use del instead of rimraf
var rimraf      = require('gulp-rimraf');

//https://blog.engineyard.com/2014/frontend-dependencies-management-part-2

gulp.task('buildjs', function () {
    return browserify('./public/src/js/main.js')
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

gulp.task('minify', ['buildjs'], function () {
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

gulp.task('watch', ['default'], function() {
    var watchFiles = [
        'app/views/index.src.swig'
    ];
    gulp.watch(watchFiles, ['default']);
});

gulp.task('default', ['minify', 'fix-template']);