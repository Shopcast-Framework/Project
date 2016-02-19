var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    nodemon = require('gulp-nodemon');

gulp.task('server:start', function() {
    nodemon({
        script: './server.js',
        ext: 'js'
    });
});

gulp.task("default", ['server:start'], function() {
    return null;
});