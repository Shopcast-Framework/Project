'use strict';

var orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Planning    = orm.db.Planning;

var PlanningGet = function(req, res) {
    Planning
    .all()
    .then(function(plannings) {
        res.status(200).send({
            message     : 'List of plannings',
            plannings   : plannings
        });
    }, function(err) {
        res.status(300).send(err);
    });
};

var PlanningGetOne = function(req, res) {
    req.user
    .getOnePlanning({id: req.params.id})
    .then(function(planning) {
        if (planning) {
            res.status(200).send({
                message     : 'Planning of id: ' + req.params.id,
                planning    : planning
            });
        } else {
            res.status(400).send({
                message : "Error can't find planning"
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
