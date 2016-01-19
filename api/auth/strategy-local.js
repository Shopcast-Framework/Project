'use strict';

var LocalStrategy   = require('passport-local').Strategy,
            orm     = require('../orm'),
            User    = orm.db.User;

var StrategyLocal = function(app, passport) {
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
        passport.authenticate('local', function(err, user) {
            if (err) {
                return res.status(400).send(err);
            }
            if (!user) {
                return res.status(400).send('Invalid user null');
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).send(err);
                }
                user.authenticate();
                return res.status(200).send(user);
            });
        })(req, res);
    };

    self.init(app, passport);
    return this;
};

exports.load = StrategyLocal;
