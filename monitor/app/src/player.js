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
    },
  generationStats : generationStats, // (filesData)
  createPlaylistTimetable : createPlaylistTimetable,
  playerAction : playerAction
};

   
    function generationStats(filesData) {
        // Calculate avg
        // Calculate median
        var stats = {};

        return stats;
    }

    function updateProbability(filesData, cnt, statistics) {

        // Duration coeffitient
        var SHORT_COEF = 1.2;
        var MED_COEF = 1.0;
        var LONG_COEF = 0.6;
        var IMG_COEF = 1.8

        // Sometimes better to reset the variables...

        // avoid repetition
        var unit = 1.0 / filesData.length;
        for (var i = 0; i < filesData.length; i++) {
            if (i != cnt) {
                var coef = MED_COEF;
                if (false) {
                    coef = SHORT_COEF;
                } else if (false) {
                    coef = LONG_COEF;
                } else if (false) {
                    coef = IMG_COEF;
                }
                filesData[i].probability += unit * coef;
            }
        }
        normalizeProbability(filesData);
    }
    
    function findRightProbability(filesData, drawnNum, stats) {
        var cnt = 0;
        var chosenFile = filesData[0];

        if (drawnNum < 0) {
            drawnNum = 0.0;
        }
        if (drawnNum > 1.0) {
            drawnNum = 1.0;
        }
        while (drawnNum > 0) {
            if (cnt >= filesData) {
                cnt = 0;
            }
            drawnNum -= filesData[cnt].probability;
            if (drawnNum > 0) {
                cnt += 1;
            }
        }
        chosenFile = filesData[cnt];
        updateProbability(filesData, cnt, stats);
        return chosenFile;
    }

    function normalizeProbability(filesData) {
        var norm = 0.0
        for (var i = 0; i < filesData.length; i++) {
            norm += filesData[i].probability
        }
        for (var i = 0; i < filesData.length; i++) {
            filesData[i].probability /= norm;
        }
    }

    function createPlaylistTimetable(from, to, filesData) {
        /// currently a simple loop
        // TODO : 
        // Init all variables [Progress]
        // Timeduration for this timetable ? [OK] - IN SECONDS
        // Simple playlist for time duration [OK]
        // Need to return estimated time to finish timetable [etimatedFinishTime]
        // Probability shuffle, simple [OK]
        // Probability shuffle, avoid repetition
        // Probability shuffle, avoid lengthy repetition
        // Probability shuffle, add tag factor
        
        console.log('[WRKON] Init all variables');
        console.log('[WRKON] time difference from to - OK');
        var timeLeft = Math.ceil((to.getTime() - from.getTime()) / 1000);
        console.log(timeLeft);
        var timeTable = [];
        var stats = generationStats(filesData);

        console.log(timeLeft);
        console.log('[WRKON] loop to add time');
        while (timeLeft > 0) {
            // Normalize probability
            normalizeProbability(filesData);
            var file = findRightProbability(filesData, Math.random(), stats);

            timeTable.push(file);
            timeLeft -= file.duration;
            console.log('[WRKON] PLAYLIST : added ' + file.src + ' ( ' + file.duration + ' )');
        }
        var estimatedFinishTime = new Date(to.getTime() - timeLeft);
        return timeTable
    }
    
    function playerAction(player, playerPlaylist, cnt) {
          console.log(cnt);
          if (cnt >= playerPlaylist.length) {
              return 0;
          }
          if (playerPlaylist[cnt].type.indexOf('image') == -1) {
              player.src(playerPlaylist[cnt]);
              player.play();
              return 0;
          } else {
              console.log('GOD DAMMIT');
              //player.bigPlayButton.show(false);
              player.poster(playerPlaylist[cnt].poster);
              player.currentTime(0);
              player.posterImage.show(true);
              setTimeout(function() {
                  playerAction(player, playerPlaylist, cnt + 1);
              }, playerPlaylist[cnt].duration * 1000);
              return 1;
          }
    }


