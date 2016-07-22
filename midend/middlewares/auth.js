'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    auth    = require(process.env.NODE_PATH + '/modules/auth'),
    config  = require(process.env.NODE_PATH + '/config/strategy.json')[process.env.NODE_ENV],
    orm    = require(process.env.NODE_PATH + '/modules/orm'),
    User    = orm.db.User,
    Message = require(process.env.NODE_PATH + '/modules/messages');

var AuthMiddleWare = function() {
    var self = this;

    self.run = function(req, res, next) {
        var roles = this && this.roles;
        if (!req.user) {
            if (req.headers.reauth) {
                var auth_body = JSON.parse(req.headers.reauth);
                req.body = auth_body;
                req.body.reauth = true;
              
                if (req.body.strategy != 'local') {
                    return res.status(301).send({
                        message     : Message.get("session:post:failure", req.body.strategy)
                    });
                }

                User.find({
                    where : {username: req.body.username, password : req.body.password}
                }).then(function(user) {
                    if (!user) {
                        res.status(Status.UNAUTHORIZED).send({
                          message: Message.get('middleware:auth:failure')
                        });
                    } else {
                        console.log('mobile bypass');
                        req.user = user;
                        next();
                        return ;
                    }
                });

            }
            else {
                return res.status(Status.UNAUTHORIZED).send({
                    message: Message.get('middleware:auth:failure')
                });
            }

        } else {
        req.user.verify(req.get('Authorization'), function(err) {
            if (err) {
                return res.status(Status.UNAUTHORIZED).send({message: err.toString()});
            }
            if (roles && roles.indexOf(req.user.role) === -1) {
                return res.status(Status.UNAUTHORIZED).send({message: Message.get("middleware:auth:badrole")});
            }
            next();
        });
        }
    };
};

module.exports = {
    name: 'auth',
    object: new AuthMiddleWare()
};
