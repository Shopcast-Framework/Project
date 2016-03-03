'use strict';

var GoogleStrategy      = require('passport-google-token').Strategy,
    orm                 = require('../orm'),
    User                = orm.db.User;

var CLIENT_APP_ID = '553975407563-gupmkgbeuuua4c2fkjgegn973v9g6892.apps.googleusercontent.com';
var CLIENT_APP_SECRET = 'ZpKkQDqdD7woYFXDX82cXzjv';

var StrategyGoogle = function(app, passport, loginCallback) {
    var self = this;

    self.init = function(app, passport) {

        var googleConf = {
            clientID: CLIENT_APP_ID,
            clientSecret: CLIENT_APP_SECRET
        };

        var authenticate = function(accessToken, refreshToken, profile, done) {
            User.find({where: {googleId:profile.userID}})
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
        console.log(req.body);
        passport.authenticate('google-token', loginCallback(req, res))(req, res);
    };

    self.init(app, passport);
    return this;
};

exports.load = StrategyGoogle;
