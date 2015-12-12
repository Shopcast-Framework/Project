'use strict';

var Sequelize   = require('sequelize');

var User = function(sequelize) {
    var Model = sequelize.define('User', {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    });

    return Model;
};

module.exports = User;
