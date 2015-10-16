'use strict';

var Sequelize   = require('sequelize');

var User = function(sequelize) {
    var Model = sequelize.define('User', {
        username: Sequelize.STRING,
        birthday: Sequelize.DATE
    });

    return Model;
};

module.exports = User;
