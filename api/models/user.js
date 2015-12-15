'use strict';

var Sequelize   = require('sequelize');

var User = function(sequelize) {
    var model = sequelize
    .define('User', {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    }, {underscored: true});

    return {
        definition : model
    };
};

module.exports = User;
