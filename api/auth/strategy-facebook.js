'use strict';

var FacebookStrategy    = require('passport-facebook-token');
    // orm                 = require('../orm'),
    // User                = orm.db.User;

var CLIENT_APP_ID = '751447004955328';
var CLIENT_APP_SECRET = 'ee7d5dc104910ccde27df46651a87e3c';

var StrategyLocal = function(app, passport) {
    var self = this;

    self.init = function(app, passport) {

        var facebookConf = {
            clientID: CLIENT_APP_ID,
            clientSecret: CLIENT_APP_SECRET
        };

        var authenticate = function(accessToken, refreshToken, profile, done) {
            console.log('JAUTHENTICATE AVEC:');
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            return done('toto');
        };

        passport.use(new FacebookStrategy(facebookConf, authenticate));
    };

    self.authenticate = function(req, res) {
        console.log(req.body);
        passport.authenticate('facebook-token', function(err, user) {
            console.log('HERE I AM');
            console.log(err);
            console.log(user);
            res.status(200).send('User logged');
        })(req, res);
    };

    self.init(app, passport);
    return this;
};

exports.load = StrategyLocal;
