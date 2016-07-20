'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var File = function(sequelize) {

    var model = sequelize
    .define('File', {
        id: {
              type            : Sequelize.INTEGER,
              autoIncrement   : true,
              primaryKey      : true
        },
        description : Sequelize.STRING,
        encoding    : Sequelize.STRING,
        name        : Sequelize.STRING,
        filename    : Sequelize.STRING,
        mimetype    : Sequelize.STRING,
        originalname: Sequelize.STRING,
        path        : Sequelize.STRING,
        tags        : Sequelize.STRING,
        duration    : Sequelize.FLOAT,
        size        : Sequelize.FLOAT
    }, {underscored: true});

    var relationships = function() {
        model.belongsToMany(orm.db.Playlist, {constraints: false, as: 'playlists', through: 'PlaylistFile'});
        model.belongsTo(orm.db.User, {constraints: false});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = File;
