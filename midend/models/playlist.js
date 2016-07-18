'use strict';

var Sequelize   = require('sequelize'),
    Q           = require('q'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    File        = orm.db.File;

var Playlist = function(sequelize) {

    var model = sequelize
    .define('Playlist', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name        : Sequelize.STRING,
        description : Sequelize.STRING,
        frequency   : Sequelize.STRING,
        tags        : Sequelize.STRING
    }, {
        underscored: true,
        instanceMethods: {
            add : function(user_id, file_ids) {
                var deferred = Q.defer(),
                    self = this,
                    max = self.files.length;

                File.findAll({
                    where: { id: file_ids}
                }).then(function(files) {
                    for (var i = 0; i < files.length; ++i) {
                        var file = files[i];
                        if (file.user_id != user_id) {
                            return deferred.reject();
                        }
                    }
                    var promises = [];
                    for (var i = 0; i < files.length; ++i) {
                        var file = files[i];
                        promises.push(self.addFile(file, {rank: max}));
                        max += 1;
                    }
                    Q.all(promises).then(deferred.resolve, deferred.reject);
                });
                return deferred.promise;
            },
            sort : function(user_id, file_ids) {
                var deferred = Q.defer(),
                    self = this;

                File.findAll({
                    where: { id: file_ids}
                }).then(function(files) {
                    if (files.length !== file_ids.length) {
                        promise.reject();
                    }
                    var _files = {};
                    for (var i = 0; i < files.length; ++i) {
                        var file = files[i];
                        if (file.user_id != user_id) {
                            return deferred.reject();
                        }
                        _files[file.id] = file;
                    }
                    var promises = [],
                        rank = 0;
                    for (var i = 0; i < file_ids.length; ++i) {
                        var file = _files[file_ids[i]];
                        promises.push(self.addFile(file, {rank: rank}));
                        rank += 1;
                    }
                    Q.all(promises).then(deferred.resolve, deferred.reject);
                });
                return deferred.promise;
            }
        }
    });

    var relationships = function() {
        model.belongsToMany(orm.db.File, {constraints: false, as: 'files', through: 'PlaylistFile'});
        model.belongsTo(orm.db.Planning, {constraints: false, as: 'planning'});
        model.belongsTo(orm.db.User, {constraints: false});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = Playlist;
