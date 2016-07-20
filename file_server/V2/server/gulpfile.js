'use strict';

var gulp    = require('gulp'),
    util    = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    sys     = require('sys'),
    exec    = require('child_process').exec,
    puts    = function(error, stdout, stderr) { sys.puts(stdout); sys.puts(stderr) };

gulp.task('serve', function() {
    process.env.NODE_ENV = util.env.env || 'development';
    process.env.NODE_PATH = __dirname;
    nodemon({
        script: './server.js',
        ext: 'js'
    });
});

gulp.task('default', ['serve']);
