'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('default', function () {

    // Start browser process
    electron.start();

    // Restart browser process
    gulp.watch('app/index.js', electron.restart);

    // Reload renderer process
    gulp.watch(['app/*', 'app/config/*', 'app/src/*', 'app/css/*', 'app/views/*'], electron.reload);
});