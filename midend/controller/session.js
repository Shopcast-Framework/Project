'use strict';

var auth    = require(process.env.NODE_PATH + '/modules/auth'),
    Message = require(process.env.NODE_PATH + '/modules/messages');

var SessionDelete = function(req, res) {
    req.logout();
    return res.status(200).send({message: Message.get("session:delete:success")});
}

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
            message : Message.get("session:post:success"),
            user    : req.user
        });
    }

    if (!strategy) {
        return res.status(301).send({
            message     : Message.get("session:post:failure", req.body.strategy)
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
    option  : SessionOption,
    delete  : SessionDelete
};

module.exports = SessionController;
