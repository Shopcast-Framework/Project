'use strict';

var Sequelize   = require('sequelize'),
    orm         = require('../orm');

var File = function(sequelize) {

    var model = sequelize
    .define('File', {
        name        : Sequelize.STRING,
        description : Sequelize.STRING,
        type        : Sequelize.STRING,
        size        : Sequelize.STRING
    }, {underscored: true});

    var relationships = function() {
        model.belongsTo(orm.db.Playlist);
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = File;