'use strict';

var passport    = require('passport'),
        orm     = require(process.env.NODE_PATH + '/modules/orm'),
        User    = orm.db.User;

var Authentificator = function(app) {
    var self = this;

    self.init = function(app) {
        app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(self.serializeUser);
        passport.deserializeUser(self.deserializeUser);

        self.loadStrategy(app);
    };

    self.login = function(req, res) {
        return function(err, user) {
            if (err) {
                return res.status(400).send(err);
            }
            if (!user) {
                return res.status(400).send({message:'Invalid user null'});
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(400).send(err);
                }
                user.authenticate();
                return res.status(200).send({message: 'User correctly authenticate', user: user});
            });
        };
    };

    self.serializeUser = function(user, done) {
        done(null, user.id);
    };

    self.deserializeUser = function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user);
            }
            else
                done('Error: Undefined user');
        });
    };

    self.loadStrategy = function(app) {
        self.strategy = {
            'local' : require('./strategy-local').load(app, passport, self.login),
            'facebook' : require('./strategy-facebook').load(app, passport, self.login),
            'google' : require('./strategy-google').load(app, passport, self.login)
        };
    };

    self.init(app);
    return this;
};

exports.load = Authentificator;
