'use strict';

var orm     = require(process.env.NODE_PATH + '/modules/orm'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    User    = orm.db.User;

var UserPut = function(req, res) {
    User
    .findById(req.params.id)
    .then(function(user) {
        if (user) {
            user.updateAttributes(req.body).then(function(user) {
                res.status(200).send({
                    message     : Message.get("user:put:success"),
                    user        : user
                });
            }, function(err) {
                res.status(300).send(err);
            });
        } else {
            res.status(400).send({message : Message.get("user:put:failure")});
        }
    }, function(err) {
        res.status(400).send(err);
    });
};

var UserGet = function(req, res) {
    User
    .all()
    .then(function(users) {
        res.status(200).send({
            message : Message.get("user:get:success"),
            users : users
        });
    }, function(err) {
        res.status(400).send(err);
    });
};

var UserPost = function(req, res) {
    User
    .create(req.body)
    .then(function(user) {
        if (user) {
            res.status(200).send({
                message : Message.get("user:post:success"),
                user : user
            });
        } else {
            res.status(400).send({message : Message.get("user:post:failure")});
        }
    }, function(err) {
        res.status(400).send(err);
    });
};

var UserGetOne = function(req, res) {
    User
    .findById(req.params.id)
    .then(function(user) {
        if (user) {
            res.status(200).send({
                message : Message.get("user:getone:success", req.params.id),
                user    : user
            });
        } else {
            res.status(400).send({
                message : Message.get("user:getone:failure", req.params.id)
            });
        }
    }, function(err) {
        res.status(400).send(err);
    });
};

var UserDelete = function(req, res) {
    User
    .destroy({
        where: {id: req.params.id}
    })
    .then(function() {
        res.status(200).send({message : Message.get("user:delete:success")});
    }, function(err) {
        res.status(400).send(err);
    });
}

var UserController = {
    delete  : UserDelete,
    get     : UserGet,
    post    : UserPost,
    put     : UserPut,
    getOne  : UserGetOne
};

module.exports = UserController;
