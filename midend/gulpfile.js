'use strict';

var gulp    = require('gulp'),
    util    = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    shell   = require('gulp-shell');

gulp.task('serve', function() {
    process.env.NODE_ENV = util.env.env || 'development';
    process.env.NODE_PATH = __dirname;
    nodemon({
        script: './server.js',
        ext: 'js'
    });
});

gulp.task('test', function() {
    process.env.NODE_ENV = 'test';
    process.env.NODE_PATH = __dirname;
    return shell.task([
        'mocha test/controller/*.js'
    ])();
});

gulp.task('default', ['serve']);
