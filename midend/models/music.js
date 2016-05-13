'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var Music = function(sequelize) {
    var model = sequelize
    .define('Music', {
        name:   Sequelize.STRING
    });

    return {
        definition      : model
    };
};

module.exports = Music;
