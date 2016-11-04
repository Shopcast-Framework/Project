'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Playlist    = orm.db.Playlist,
    PlaylistFile= orm.db.PlaylistFile,
    Planning    = orm.db.Planning,
    File        = orm.db.File;

var PlayListGet = function(req, res) {
    Planning.findOne({
        where: {
            monitor_id  : req.params.monitor_id
        },
        include: [{
            model: Playlist,
            as: 'playlist',
            include : [{
                model : File,
                as: 'files',
                order : ['rank', 'ASC']
            }]
        }]
    })
    .then(function(planning) {
        if (planning) {
            res.status(Status.OK).send({
                message     : Message.get("playlist:getone:success", req.params.monitor_id),
                playlist    : planning.playlist
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("playlist:getone:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlayListController = {
    get     : PlayListGet
};

module.exports = PlayListController;
