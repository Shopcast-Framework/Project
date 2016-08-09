'use strict';

var BearerStrategy      = require('passport-http-bearer').Strategy,
    orm                 = require(process.env.NODE_PATH + '/modules/orm'),
    config              = require(process.env.NODE_PATH + '/config/strategy.json')[process.env.NODE_ENV],
    User                = orm.db.User;

var StrategyBearer = function(app, passport) {
    var self = this;

    self.init = function(app, passport) {

        var authenticate = function(token, done) {

            User.find({
                where: {token:token}
            })
            .then(function(user) {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            });
        };

        passport.use(new BearerStrategy(authenticate));
    };

    self.authenticate = function(req, res, done) {
        return passport.authenticate('bearer', { session: false })(req, res, done);
    }

    self.init(app, passport);
    return this;
};

exports.load = StrategyBearer;
