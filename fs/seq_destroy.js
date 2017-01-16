var fs = require('fs');

var sequelize = require('sequelize');
var orm = require(process.env.NODE_PATH + '/modules/orm');

orm.load();

var ormFile = orm.db.File;
var ormPlaylistFile = orm.db.PlaylistFile;

function testDestroyFromPlaylist(des_play_id, des_file_id) {
    ormPlaylistFile.destroy({
      where : {
        file_id : des_file_id,
        playlist_id : des_play_id
        // rank
      },
      force : true
    }).then(function () {
      console.log('FILE [' + des_file_id + '] deleted form PLAYLIST [' + des_play_id + ']');
    });
};

function testDestroyAllPlaylistFile(des_id) {
    ormPlaylistFile.destroy({
      where : {file_id : des_id},
      force : true
    }).then(function () {
      console.log('FILE [' + des_id + '] deleted from all playlists !');
    });
}

function testDestroyFile(des_id) {
    ormFile.destroy({
      where : {id : des_id},
      force : true
    }).then(function () {
      console.log('FILE [' + des_id + '] successfully destroyed');
    });
}

console.log('Nothing ventured, nothing gained');
testDestroyFile(6);
//testDestroyFile(6);
