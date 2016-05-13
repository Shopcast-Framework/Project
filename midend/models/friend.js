'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var Friend = function(sequelize) {
    var model = sequelize
    .define('Friend', {
        accepted:   Sequelize.BOOLEAN
    }, {underscored: true});

    return {
        definition      : model
    };
};

module.exports = Friend;
