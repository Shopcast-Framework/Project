'use strict';

var passport    = require('passport'),
        orm     = require('../orm'),
        User    = orm.db.User;

var Authentificator = function(app) {
    var self = this;

    self.init = function(app) {
        app.use(require('cookie-parser')());
        app.use(require('body-parser').json());
        app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(self.serializeUser);
        passport.deserializeUser(self.deserializeUser);

        self.loadStrategy(app);
    };

    self.serializeUser = function(user, done) {
        console.log('SERIALIZE USER');
        done(null, user.id);
    };

    self.deserializeUser = function(id, done) {
        console.log('DESERIALIZE USER');
        User.find({
            where: {id: id},
            attributes: ['id', 'username', 'password']
        }).then(function(user) {
            console.log(user);
            if (user)
                done(user);
            else
                done(null, 'Error: Undefined user');
        });
    };

    self.loadStrategy = function(app) {
        self.strategy = {
            'local' : require('./strategy-local').load(app, passport)
        };
    };

    self.init(app);
    return this;
};

exports.load = Authentificator;
