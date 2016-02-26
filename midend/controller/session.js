'use strict';

var auth    = require('../auth');

var SessionGet = function(req, res) {
    req = res;
    console.log('SESSION GET');
    return res.status(200).send('Session ok');
};

var SessionOption = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    return res.status(200).send();
};

//TODO Mettre un middleware pour allow origin
var SessionPost = function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    var strategy = auth.strategy[req.body.strategy];

    if (req.user) {
        req.user.authenticate();
        return res.status(200).send({
            message: 'User already logged',
            user: req.user
        });
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
    return res.status(200).send('Session ok');
};

var SessionController = {
    get     : SessionGet,
    post    : SessionPost,
    getOne  : SessionGetOne,
    option  : SessionOption
};

module.exports = SessionController;