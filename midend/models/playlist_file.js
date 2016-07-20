'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var PlaylistFile = function(sequelize) {

    var model = sequelize
    .define('PlaylistFile', {
        rank   : Sequelize.INTEGER
    }, {underscored: true});

    var relationships = function() {
        model.belongsTo(orm.db.Playlist, {constraints : false, as : 'playlist'});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = PlaylistFile;
