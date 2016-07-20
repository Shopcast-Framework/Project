'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var PlaylistFile = function(sequelize) {

    var model = sequelize
    .define('PlaylistFile', {
        rank   : Sequelize.INTEGER
    }, {underscored: true});

    return {
        definition      : model
    };
};

module.exports = PlaylistFile;
