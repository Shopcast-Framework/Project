'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    History     = orm.db.History,
    Monitor     = orm.db.Monitor,
    Playlist    = orm.db.Playlist;

var HistoryGet = function(req, res) {
    History
    .findAll({
        where: {
            user_id: req.user.id
        },
        include : [{
            model     : Playlist,
            as        : 'playlist',
            required  : false
        }, {
            model     : Monitor,
            as        : 'monitor',
            required  : false
        }]
    })
    .then(function(history) {
        res.status(Status.OK).send({
            message     : Message.get("history:get:success"),
            history     : history
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var HistoryController = {
    get     : HistoryGet
};

module.exports = HistoryController;
