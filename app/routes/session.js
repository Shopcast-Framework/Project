'use strict';

var Router = require('express').Router();
var Rest = require('../rest');

Router.post('/', function( req, res ) {

    Rest.post('session', JSON.stringify(req.body)).then(function(data) {
        var response = JSON.parse(data);

        res.redirect('/sign_in?message=' + response.message);
    }, function(data) {
        var response = JSON.parse(data);

        res.redirect('/dashboards?message=' + response.message);
    });
});

module.exports = Router;
