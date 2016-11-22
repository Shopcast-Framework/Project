'use strict';

var LocalStrategy   = require('passport-local').Strategy,
            orm     = require(process.env.NODE_PATH + '/modules/orm'),
            User    = orm.db.User;

var StrategyLocal = function(app, passport, loginCallback) {
    var self = this;

    self.init = function(app, passport) {
        var authenticate = function(username, password, done) {
            User.find({
                where: {username: username},
                attributes: ['id', 'username', 'name', 'password', 'avatar','email', 'role', 'sex']
	        }).then(function(user) {
                if (!user) {
                    done({message: 'Error: Could not find user: ' + username});
                } else if (user.password !== password) {
                    done({message: 'Invalid password'});
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
