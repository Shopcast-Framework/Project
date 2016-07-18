'use strict';

var Status  = require(process.env.NODE_PATH + '/config/status.json'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    Gitlog  = require('gitlog');

var GroupGet = function(req, res) {

    var options = {
        repo    : process.env.NODE_PATH,
        number  : 10,
        fields  : [
            'hash',
            'committerName',
            'committerDate',
            'committerDateRel',
            'subject'
        ]
    };

    Gitlog(options, function(error, commits) {
        if (error) {
            return res.status(Status.UNAUTHORIZED).send({message: error.toString()});
        }
        res.status(Status.OK).send({
            message : Message.get("group:get:success"),
            commits : commits
        });
    });

};

var GroupController = {
    get     : GroupGet
};

module.exports = GroupController;
