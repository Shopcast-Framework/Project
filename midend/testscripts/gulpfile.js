'use strict';

var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
    nodemon({
        script: './server.js',
        ext: 'js'
    });
});

gulp.task('default', ['serve']);
