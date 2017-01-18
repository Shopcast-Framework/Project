'use strict';

var Sequelize   = require('sequelize'),
    Format      = require(process.env.NODE_PATH + '/config/file/format.json'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Q           = require('q'),
    Uploader    = require(process.env.NODE_PATH + '/modules/uploader'),
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

    model.upload = function(file) {
        if (Format.indexOf(file.mimetype) == -1) {
            return Q.reject(new Error(Message.get("file:post:wrongtype")));
        }
        var defer = Q.defer();
        var data = Uploader.convert(file.data);
        Uploader.upload(data).then(function(uploadedFile) {
            file.size = file.data.length;
            file.path = uploadedFile.path;
            file.filename = uploadedFile.name;
            model.create(file).then(defer.resolve, defer.reject);
        });
        return defer.promise;
    }

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
