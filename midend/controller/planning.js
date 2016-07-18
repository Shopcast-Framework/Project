'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Monitor     = orm.db.Monitor,
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

var PlanningController = {
    get     : PlanningGet,
    getOne  : PlanningGetOne
};

module.exports = PlanningController;
