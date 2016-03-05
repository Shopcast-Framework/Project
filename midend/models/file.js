'use strict';

var Sequelize   = require('sequelize'),
    orm         = require('../orm');

var File = function(sequelize) {

    var model = sequelize
    .define('File', {
        name        : Sequelize.STRING,
        description : Sequelize.STRING,
        type        : Sequelize.STRING,
        size        : Sequelize.FLOAT,
        duration    : Sequelize.INTEGER
    }, {underscored: true});

    var relationships = function() {
        model.belongsToMany(orm.db.Playlist);
    };

    return {
        definition      : model
        //relationships   : relationships
    };
};

module.exports = File;
