'use strict';

var Status  = require(process.env.NODE_PATH + '/config/status.json'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    Gitlog  = require('gitlog');

var InfoGet = function(req, res) {

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
            message : Message.get("info:get:success"),
            commits : commits
        });
    });

};

var InfoController = {
    get     : InfoGet
};

module.exports = InfoController;
