'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Monitor     = orm.db.Monitor,
    Playlist    = orm.db.Playlist,
    Planning    = orm.db.Planning;

var PlanningGet = function(req, res) {
    Planning
    .findAll({
        where: {
            user_id: req.user.id
        },
        include: [{
            model: Monitor,
            as: 'monitor'
        }, {
            model : Playlist,
            as: 'playlist'
        }]
    })
    .then(function(plannings) {
        res.status(Status.OK).send({
            message     : Message.get("planning:get:success"),
            plannings   : plannings
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlanningGetOne = function(req, res) {
    Planning
    .find({
        where: {
            id      : req.params.id,
            user_id : req.user.id
        },
        include: [{
            model: Monitor,
            as: 'monitor'
        }]
    })
    .then(function(planning) {
        if (planning) {
            res.status(Status.OK).send({
                message     : Message.get("planning:getone:success", req.params.id),
                planning    : planning
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({
                message : Message.get("planning:getone:failure")
            })
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlanningDelete = function(req, res) {
    req.user
    .getOnePlanning({id: req.params.id})
    .then(function(planning) {
        if (planning) {
            planning.destroy().then(function() {
                res.status(Status.OK).send({message : Message.get("planning:delete:success")});
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("planning:delete:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlanningPut = function(req, res) {
    req.user
    .getOnePlanning({id: req.params.id})
    .then(function(planning) {
        if (!planning) {
            return res.status(Status.UNAUTHORIZED).send({message:Message.get("planning:put:failure")})
        }
        planning
        .updateAttributes(req.body)
        .then(function(planning) {
            if (!planning) {
                return res.status(Status.UNAUTHORIZED).send({message:Message.get("planning:put:failure")})
            }
            res.status(Status.OK).send({
                message     : Message.get("planning:put:success"),
                planning    : planning
            });
        }, function(err) {
            res.status(Status.UNAUTHORIZED).send({message: err.toString()});
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlanningPost = function(req, res) {
    req.user
    .createPlanning(req.body)
    .then(function(planning) {
        res.status(Status.OK).send({
            message     : Message.get("planning:post:success"),
            planning    : planning
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlanningController = {
    get     : PlanningGet,
    getOne  : PlanningGetOne,
    post    : PlanningPost,
    put     : PlanningPut,
    delete  : PlanningDelete
};

module.exports = PlanningController;
