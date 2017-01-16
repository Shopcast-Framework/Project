var sequelize = require('sequelize');
var orm = require(process.env.NODE_PATH + '/modules/orm');
orm.load();

var ormFile = orm.db.File;
var ormPlaylist = orm.db.Playlist;
var ormPlaylistFile = orm.db.PlaylistFile;

function testJoinPlaylist(file_id) {
  ormFile.findAll({
    //where : {
    //},
    include : [{
      model : ormPlaylist,
      as : 'playlists',
      required : true
    }]
  }).then(function (files) {
    files.forEach(function(file) {
      console.log(file.dataValues);
      console.log(file.playlists.length);
    });
  });
};

console.log('Reverse blackmagic');
testJoinPlaylist(3);
