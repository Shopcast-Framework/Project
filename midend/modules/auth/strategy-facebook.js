'use strict';

var FacebookStrategy    = require('passport-facebook-token'),
    orm                 = require('../orm'),
    config              = require(process.env.NODE_PATH + '/config/strategy.json')[process.env.NODE_ENV],
    User                = orm.db.User;

var StrategyFacebook = function(app, passport, loginCallback) {
    var self = this;

    self.init = function(app, passport) {

        var facebookConf = {
            clientID: config.facebook.CLIENT_APP_ID,
            clientSecret: config.facebook.CLIENT_APP_SECRET
        };

        var authenticate = function(accessToken, refreshToken, profile, done) {
            User.find({where: {facebookId:profile.userID}})
            .then(function(user) {
                if (user) {
                    return done(null, user);
                }
                User
                .create({
                    username: profile.displayName,
                    name: profile.displayName,
                    avatar: profile.photos[0].value,
                    facebookId: profile.id
                })
                .then(function(user) {
                    return done(null, user);
                }, done);
            }, done);
        };

        passport.use(new FacebookStrategy(facebookConf, authenticate));
    };

    self.authenticate = function(req, res) {
        console.log(req.body);
        passport.authenticate('facebook-token', loginCallback(req, res))(req, res);
    };

    self.init(app, passport);
    return this;
};

exports.load = StrategyFacebook;
