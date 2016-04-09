'use strict';

var Sequelize   = require('sequelize'),
    jwt         = require('jsonwebtoken');

var User = function(sequelize) {
    var model = sequelize
    .define('User', {
        username: Sequelize.STRING,
        description: Sequelize.STRING,
        age: Sequelize.STRING,
        sex: Sequelize.STRING,
        location: Sequelize.STRING,
        password: Sequelize.STRING,
        token: Sequelize.VIRTUAL,
        role: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        facebookId: Sequelize.STRING,
        googleId: Sequelize.STRING,
        last_connection: Sequelize.DATE
    }, {
        underscored: true,
        instanceMethods: {
            authenticate: function() {
                this.token = jwt.sign(this.username, '/*986_@$*#[sdaw<!+');
            },
            verify: function(token, done) {
                var self = this;
                jwt.verify(token, '/*986_@$*#[sdaw<!+', function(err, decoded) {
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
