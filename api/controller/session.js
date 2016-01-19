'use strict';

var auth    = require('../auth');

var SessionGet = function(req, res) {
    req = res;
    console.log('SESSION GET');
};

var SessionPost = function(req, res) {
    var strategy = auth.strategy[req.body.strategy];

    if (req.user) {
        return res.status(200).send(req.user);
    }

    if (!strategy) {
        return res.status(301).send({
            message     : 'Error : Invalid strategy : ' + req.body.strategy
        });
    }
    strategy.authenticate(req, res);
};

var SessionGetOne = function(req, res) {
    req = res;
    console.log('SESSION GET ONE');
};

var SessionController = {
    get     : SessionGet,
    post    : SessionPost,
    getOne  : SessionGetOne
};

module.exports = SessionController;
