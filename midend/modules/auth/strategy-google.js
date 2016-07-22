'use strict';

var GoogleStrategy      = require('passport-google-token').Strategy,
    orm                 = require('../orm'),
    config              = require(process.env.NODE_PATH + '/config/strategy.json')[process.env.NODE_ENV],
    User                = orm.db.User;

var StrategyGoogle = function(app, passport, loginCallback) {
    var self = this;

    self.init = function(app, passport) {

        var googleConf = {
            clientID: config.google.CLIENT_APP_ID,
            clientSecret: config.google.CLIENT_APP_SECRET
        };

        var authenticate = function(accessToken, refreshToken, profile, done) {
            User.find({
                where: {googleId:profile.id}
            })
            .then(function(user) {
                if (user) {
                    console.log('Authenticated');
                    return done(null, user);
                }
                User
                .create({
                    username: profile.displayName,
                    name: profile.displayName,
                    avatar: profile._json.picture,
                    googleId: profile.id,
                    role: 1
                })
                .then(function(user) {
                    console.log('User created');
                    return done(null, user);
                }, done);
            }, done);
        };

        passport.use(new GoogleStrategy(googleConf, authenticate));
    };

    self.authenticate = function(req, res) {
        passport.authenticate('google-token', loginCallback(req, res))(req, res);
    };

    self.init(app, passport);
    return this;
};

exports.load = StrategyGoogle;
