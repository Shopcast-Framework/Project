'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    User        = orm.db.User,
    Group       = orm.db.Group;

var GroupPut = function(req, res) {
    Group
    .findById(req.params.id)
    .then(function(group) {
        if (!group) {
            return res.status(Status.UNAUTHORIZED).send({message:Message.get("group:put:failure")})
        }
        group
        .updateAttributes(req.body)
        .then(function(group) {
            if (!group) {
                return res.status(Status.UNAUTHORIZED).send({message:Message.get("group:put:failure")})
            }
            res.status(Status.OK).send({
                message     : Message.get("group:put:success"),
                group     : group
            });
        }, function(err) {
            res.status(Status.UNAUTHORIZED).send(err);
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var GroupGet = function(req, res) {
    Group
    .all()
    .then(function(groups) {
        res.status(Status.OK).send({
            message     : Message.get("group:get:success"),
            groups    : groups
        });
    }, function (err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var GroupPost = function(req, res) {
    Group
    .create(req.body)
    .then(function(group) {
        res.status(Status.OK).send({
            message     : Message.get("group:post:success"),
            group       : group
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var GroupGetOne = function(req, res) {
    Group
    .findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: User,
            as: 'Users'
        }]
    })
    .then(function(group) {
        if (group) {
            res.status(Status.OK).send({
                message     : Message.get("group:getone:success", req.params.id),
                group       : group
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("group:getone:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var GroupDelete = function(req, res) {
    Group
    .destroy({
        where: {id: req.params.id}
    })
    .then(function() {
        res.status(Status.OK).send({message : Message.get("group:delete:success")});
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var GroupController = {
    get     : GroupGet,
    post    : GroupPost,
    put     : GroupPut,
    getOne  : GroupGetOne,
    delete  : GroupDelete
};

module.exports = GroupController;
