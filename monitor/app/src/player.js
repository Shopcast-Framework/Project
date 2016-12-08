const $ = require("jquery");
const settings = require('electron-settings');
const _setInterval = require('setinterval-plus');
const videojs = require("video.js");
const request = require('request');
const core = require("./tools");

module.exports = {
    init: function() {
        core.loadTemplate("player.html");
        var player = videojs('video-player', { /* Options */ }, function() {
            console.log('Good to go!');

            this.play(); // if you don't trust autoplay for some reason

            // How about an event listener?
            this.on('ended', function() {
                console.log('awww...over so soon?');
            });
        });
    }
};