'use strict';

var Status  = require(process.env.NODE_PATH + '/config/status.json'),
    auth    = require(process.env.NODE_PATH + '/modules/auth'),
    config  = require(process.env.NODE_PATH + '/config/strategy.json')[process.env.NODE_ENV],
    Message = require(process.env.NODE_PATH + '/modules/messages');

var SessionConfig = function(req, res) {
    return res.status(Status.OK).send({
        message: Message.get("session:config:success"),
        config: config
    });
};

var SessionDelete = function(req, res) {
    req.logout();
    return res.status(Status.OK).send({message: Message.get("session:delete:success")});
};

var SessionGet = function(req, res) {
    req = res;
    console.log('SESSION GET');
    return res.status(Status.OK).send('Session ok');
};

var SessionOption = function(req, res) {
    return res.status(Status.OK).send();
};

var SessionPost = function(req, res) {
    console.log(req.body);
    var strategy = auth.strategy[req.body.strategy];
    console.log(req.user);
    console.log(strategy);

    if (req.user) {
        req.user.authenticate();
        return res.status(Status.OK).send({
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
    return res.status(Status.OK).send('Session ok');
};

var SessionController = {
    get     : SessionGet,
    post    : SessionPost,
    getOne  : SessionGetOne,
    option  : SessionOption,
    delete  : SessionDelete,
    config  : SessionConfig
};

module.exports = SessionController;
