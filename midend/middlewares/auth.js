'use strict';

var Status          = require(process.env.NODE_PATH + '/config/status.json'),
    Message         = require(process.env.NODE_PATH + '/modules/messages'),
    Auth            = require(process.env.NODE_PATH + '/modules/auth');

var AuthMiddleWare = function() {
    var self = this;

    self.run = [Auth.strategy.bearer.authenticate, function(req, res, next) {
        var roles = this && this.roles;

        if (!req.user) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get('middleware:auth:failure')
            });
        }
        req.user.verify(req.get('Authorization'), function(err) {
            if (err) {
                return res.status(Status.UNAUTHORIZED).send({message: err.toString()});
            }
            if (roles && roles.indexOf(req.user.role) === -1) {
                return res.status(Status.UNAUTHORIZED).send({message: Message.get("middleware:auth:badrole")});
            }
            next();
        });
    }];
};

module.exports = {
    name: 'auth',
    object: new AuthMiddleWare()
};
