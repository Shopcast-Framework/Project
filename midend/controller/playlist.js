'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Playlist    = orm.db.Playlist,
    User        = orm.db.User,
    File        = orm.db.File;

var PlayListPut = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id})
    .then(function(playlist) {
        if (!playlist) {
            return res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:put:failure")})
        }
        playlist
        .updateAttributes(req.body)
        .then(function(playlist) {
            if (!playlist) {
                return res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:put:failure")})
            }
            res.status(Status.OK).send({
                message     : Message.get("playlist:put:success"),
                playlist    : playlist
            });
        }, function(err) {
            res.status(Status.UNAUTHORIZED).send(err);
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var PlayListGet = function(req, res) {
    req.user
    .getPlaylists()
    .then(function(playlists) {
        res.status(Status.OK).send({
            message     : Message.get("playlist:get:success"),
            playlists   : playlists
        });
    }, function (err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var PlayListPost = function(req, res) {
    req.user
    .createPlaylist(req.body)
    .then(function(playlist) {
        res.status(Status.OK).send({
            message     : Message.get("playlist:post:success"),
            playlist    : playlist
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var PlaylistGetOne = function(req, res) {
    Playlist.findOne({
        where: {
            id      : req.params.id,
            user_id : req.user.id
        },
        include: [{
            model: File,
            as: 'Files'
        }]
    })
    .then(function(playlist) {
        if (playlist) {
            res.status(Status.OK).send({
                message     : Message.get("playlist:getone:success", req.params.id),
                playlist    : playlist
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("playlist:getone:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var PlaylistDelete = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id})
    .then(function(playlist) {
        if (playlist) {
            playlist.destroy().then(function() {
                res.status(Status.OK).send({message : Message.get("playlist:delete:success")});
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("playlist:delete:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var PlayListController = {
    get     : PlayListGet,
    post    : PlayListPost,
    put     : PlayListPut,
    getOne  : PlaylistGetOne,
    delete  : PlaylistDelete
};

module.exports = PlayListController;
