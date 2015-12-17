'use strict';

var Sequelize   = require('sequelize'),
    jwt         = require('jsonwebtoken');

var User = function(sequelize) {
    var model = sequelize
    .define('User', {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        token: Sequelize.VIRTUAL,
        role: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        last_connection: Sequelize.DATE
    }, {
        underscored: true,
        instanceMethods: {
            authenticate: function() {
                this.token = jwt.sign(this.username, '/*986_@$*#[sdaw<!+');
            }
        }
    });

    return {
        definition : model
    };
};

module.exports = User;