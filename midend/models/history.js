'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var History = function(sequelize) {

    var model = sequelize
    .define('History', {
        id: {
              type            : Sequelize.INTEGER,
              autoIncrement   : true,
              primaryKey      : true
        },
    }, {underscored: true});

    var relationships = function() {
        model.belongsTo(orm.db.Playlist, {constraints: false, as: 'playlist'});
        model.belongsTo(orm.db.Monitor, {constraints: false, as: 'monitor'});
        model.belongsTo(orm.db.User, {constraints: false});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = History;
