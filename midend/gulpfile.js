'use strict';

var gulp    = require('gulp'),
    util    = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    mocha   = require('gulp-mocha');

gulp.task('serve', function() {
    process.env.NODE_ENV = util.env.env || 'development';
    nodemon({
        script: './server.js',
        ext: 'js'
    });
});

gulp.task('test', function() {
    process.env.NODE_ENV = 'test';
    return gulp.src(['test/controller/*.js'], { read: false })
    .pipe(mocha({
        reporter: 'min'
    }))
    .once('end', function() {
            process.exit();
    });
});

gulp.task('default', ['serve']);
