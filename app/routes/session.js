'use strict';

var Router = require('express').Router();
var Rest = require('../rest');

Router.post('/', function( req, res ) {

    Rest.post('session', JSON.stringify(req.body))
    .then(function(data) {
        console.log('ANSWER OK');
        console.log(data);
        var response = JSON.parse(data);

        if (!response.user || !response.user.token) {
            return res.redirect('/sign_in?message=token is undefined');
        }

        req.session.user = response.user;
        res.redirect('/dashboards?message=' + response.message);
    }, function(data) {
        console.log('ANSWER ERROR');
        var response = JSON.parse(data);

        res.redirect('/sign_in?message=' + response.message);
    });
});

module.exports = Router;
