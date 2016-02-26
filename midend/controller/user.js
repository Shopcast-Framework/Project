'use strict';

var orm     = require('../orm'),
    User    = orm.db.User;

var UserGet = function(req, res) {
    User
    .all()
    .then(function(users) {
        res.status(200).send({
            message : 'List of users',
            users : users
        });
    });
};

var UserPost = function(req, res) {
    User
    .create(req.body)
    .then(function(user) {
        res.status(200).send({
            message : 'User successfully created',
            user : user
        });
    });
};

var UserGetOne = function(req, res) {
    User.findById(req.params.id)
    .then(function(user) {
        if (user) {
            res.status(200).send({
                message : 'User selected with id:' + req.params.id,
                user    : user
            });
        }
        else {
            res.status(400).send({
                message : 'User selected with id:' + req.params.id + ' was not found',
            });
        }
    });
};

var UserController = {
    get     : UserGet,
    post    : UserPost,
    getOne  : UserGetOne
};

module.exports = UserController;