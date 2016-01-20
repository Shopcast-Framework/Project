'use strict';

var Sequelize   = require('sequelize'),
    jwt         = require('jsonwebtoken');

var User = function(sequelize) {
    var model = sequelize
    .define('User', {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        token: Sequelize.VIRTUAL
    }, {
        underscored: true,
        instanceMethods: {
            authenticate: function() {
                this.token = jwt.sign(this.username, 'shhhhh');
            },
            verify: function(token, done) {
                var self = this;
                jwt.verify(token, 'shhhhh', function(err, decoded) {
                    if (err) {
                        return done(err);
                    }
                    if (decoded !== self.username) {
                        return done({message: 'Error: Invalid token'});
                    }
                    return done(null);
                });
            }
        }
    });

    return {
        definition : model
    };
};

module.exports = User;
