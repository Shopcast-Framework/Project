'use strict';

var FacebookStrategy    = require('passport-facebook-token'),
    orm                 = require('../orm'),
    User                = orm.db.User;

var CLIENT_APP_ID = '751447004955328';
var CLIENT_APP_SECRET = 'ee7d5dc104910ccde27df46651a87e3c';

var StrategyFacebook = function(app, passport, loginCallback) {
    var self = this;

    self.init = function(app, passport) {

        var facebookConf = {
            clientID: CLIENT_APP_ID,
            clientSecret: CLIENT_APP_SECRET
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
                    facebookId: profile.userID
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
