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

var UserController = {
    get : UserGet,
    post: UserPost
};

module.exports = UserController;
