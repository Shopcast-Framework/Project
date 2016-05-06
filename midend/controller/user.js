'use strict';

var orm     = require('../orm'),
    User    = orm.db.User;

var UserPut = function(req, res) {
    User
    .findById(req.params.id)
    .then(function(user) {
        if (user) {
            user.updateAttributes(req.body).then(function(user) {
                res.status(200).send({
                    message     : 'User correctly updated',
                    user        : user
                });
            }, function(err) {
                res.status(300).send(err);
            });
        } else {
            res.status(400).send({
                message : "Error can't edit user"
            });
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
            message : 'List of users',
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
                message : 'User successfully created',
                user : user
            });
        } else {
            res.status(400).send({
                message : "Error can't create user"
            });
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
                message : 'User selected with id:' + req.params.id,
                user    : user
            });
        } else {
            res.status(400).send({
                message : 'User selected with id:' + req.params.id + ' was not found',
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
        res.status(200).send({message : 'User correctly deleted'});
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
