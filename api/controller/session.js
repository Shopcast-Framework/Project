'use strict';

var auth    = require('../auth');

var SessionGet = function(req, res) {
    req = res;
    console.log('SESSION GET');
};

var SessionPost = function(req, res) {
    auth.strategy[req.body.strategy].authenticate(req, res);
};

var SessionController = {
    get: SessionGet,
    post: SessionPost
};

module.exports = SessionController;
