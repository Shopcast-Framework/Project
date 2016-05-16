'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var Playlist = function(sequelize) {

    var model = sequelize
    .define('Playlist', {
        name        : Sequelize.STRING,
        description : Sequelize.STRING,
        frequency   : Sequelize.STRING,
        tags        : Sequelize.STRING
    }, {underscored: true});

    var relationships = function() {
        model.hasMany(orm.db.File, {as: 'files', constraints: false});
        model.belongsTo(orm.db.User, {constraints: false});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = Playlist;
