'use strict';

var Router          = require('express').Router();
var Rest            = require('../rest');
var passport        = require('passport');
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;

var onSuccess = function(req, res, datas) {
    console.log('ANSWER OK');
    var response = datas.body;

    if (!response.user || !response.user.token) {
        return res.redirect('/signin?message=Token is undefined');
    }

    req.session.user = response.user;
    res.set('set-cookie', datas.headers['set-cookie']);
    res.redirect('/dashboards?message=' + response.message);
};

var onError = function(req, res, datas) {
    console.log('ANSWER ERROR');
    console.log(datas);
    try {
        var response = JSON.parse(datas.body);
    } catch (e) {
        return res.redirect('/signin?message=Invalid data');
    }

    res.redirect('/signin?message=' + response.message);
};

Router.post('/', function( req, res ) {

    Rest.post('session', JSON.stringify(req.body))
    .then(function(datas) {
        onSuccess(req, res, datas);
    }, function(datas) {
        onError(req, res, datas);
    });
});

passport.use(new GoogleStrategy({
        clientID: '553975407563-gupmkgbeuuua4c2fkjgegn973v9g6892.apps.googleusercontent.com',
        clientSecret: 'ZpKkQDqdD7woYFXDX82cXzjv',
        callbackURL: 'http://127.0.0.1:3000/session/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        return done(accessToken, refreshToken, profile);
    }
));

Router.get('/auth/google',
    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' })
);

Router.get('/auth/google/callback', function(req, res) {
    passport.authenticate('google', function(accessToken, refreshToken, profile) {

        Rest.post('session', JSON.stringify({
            strategy: 'google',
            access_token: accessToken,
            refresh_token: refreshToken
        }))
        .then(function(datas) {
            onSuccess(req, res, datas);
        }, function(datas) {
            onError(req, res, datas);
        });

    })(req, res);
});

module.exports = Router;