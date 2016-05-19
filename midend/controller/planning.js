'use strict';

var orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Planning    = orm.db.Planning;

var PlanningGet = function(req, res) {
    Planning
    .findAll({
        where: {
            user_id: req.user.id
        }
    })
    .then(function(plannings) {
        res.status(200).send({
            message     : Message.get("planning:get:success"),
            plannings   : plannings
        });
    }, function(err) {
        res.status(300).send(err);
    });
};

var PlanningGetOne = function(req, res) {
    Planning
    .find({
        where: {
            id      : req.params.id,
            user_id : req.user.id
        }
    })
    .then(function(planning) {
        if (planning) {
            res.status(200).send({
                message     : Message.get("planning:getone:success", req.params.id),
                planning    : planning
            });
        } else {
            res.status(400).send({
                message : Message.get("planning:getone:failure")
            })
        }
    }, function(err) {
        res.status(300).send(err);
    });
};

var PlanningController = {
    get     : PlanningGet,
    getOne  : PlanningGetOne
};

module.exports = PlanningController;
