'use strict'

var orm     = require('../orm')
var ran     = require('randomstring')
function launchingOtherFunctions(orm) {
    console.log('other function has been successfully launched');
}

function launchOrmFunction(orm) {
    console.log('other function with ORM has been successfully launched');
    var File = orm.db.File;
    File.all().then(function(file) {
      file.forEach(function(f) {
          console.log(JSON.stringify(f));
      });
    });
}

function randomDataFile(rowNum) {
    console.log('Random filler for File function has been called');
    var FileDB = orm.db.File;
    for (var i = 0; i < rowNum; i++) {
        var content = {
            name        : ran.generate(),
            description : ran.generate(),
            type        : 'test',
            size        : Math.random() * (250),
            duration    : (Math.floor(Math.random() * (6000)))
        };
        FileDB.create(content);
      }
}

function randomDataPlaylist(rowNum) {
    console.log('Ramdom filler for Playlist has been called');
    var PlaylistDB = orm.db.Playlist;
    for (var i = 0; i < rowNum; i++) {
        var content = {
            name        : ran.generate(10),
            description : 'filler test',
            frequency   : 'never',
            tags        : 'fillers'
        }
        PlaylistDB.create(content);
        var max = Math.random() * 10;

        for (var j = 0; j < max; j++) {
            var TimetableDB = orm.db.Timetable;
            var tableContent = {
                start       : new Date()
                /// NEED TO ADD THE RELATIONSHIP TO THE FILES
            };
            TimetableDB.create(tableContent);
        }
    }
}

function generateReports() {
    console.log('Generate Reports functions has been called');
}

orm.load();
console.log('Orm has been loaded');
//randomDataFile(100);
//randomDataPlaylist(1);
