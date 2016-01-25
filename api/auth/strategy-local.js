'use strict';

var LocalStrategy   = require('passport-local').Strategy,
            orm     = require('../orm'),
            User    = orm.db.User;

var StrategyLocal = function(app, passport, loginCallback) {
    var self = this;

    self.init = function(app, passport) {
        var authenticate = function(username, password, done) {
            console.log('AUTHENTICATE');
            User.find({
                where: {username: username},
                attributes: ['id', 'username', 'password']
	        }).then(function(user) {
                if (!user) {
                    done('Error: Could not find user: ' + username);
                } else if (user.password !== password) {
                    done('Invalid password');
                } else {
                    done(null, user);
                }
            });
        };

        passport.use(new LocalStrategy(authenticate));
    };

    self.authenticate = function(req, res) {
        passport.authenticate('local', loginCallback(req, res))(req, res);
    };

    self.init(app, passport);
    return this;
};

exports.load = StrategyLocal;
