'use strict';

var orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Playlist    = orm.db.Playlist,
    User        = orm.db.User,
    File        = orm.db.File;

var PlayListPut = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id})
    .then(function(playlist) {
        playlist
        .updateAttributes(req.body)
        .then(function(playlist) {
            res.status(200).send({
                message     : 'Playlist correctly updated',
                playlist    : playlist
            });
        }, function(err) {
            res.status(300).send(err);
        });
    }, function(err) {
        res.status(400).send(err);
    });
};

var PlayListGet = function(req, res) {
    req.user
    .getPlaylists()
    .then(function(playlists) {
        res.status(200).send({
            message     : 'List of playlists',
            playlists   : playlists
        });
    }, function (err) {
        res.status(400).send(err);
    });
};

var PlayListPost = function(req, res) {
    req.user
    .createPlaylist(req.body)
    .then(function(playlist) {
        res.status(200).send({
            message     : 'Playlist successfully created',
            playlist    : playlist
        });
    }, function(err) {
        res.status(400).send(err);
    });
};

var PlaylistGetOne = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id}, {
        include: [{
            model: File,
            as: 'files'
        }]
    })
    .then(function(playlist) {
        if (playlist) {
            res.status(200).send({
                message     : 'Playlist selected with id:' + req.params.id,
                playlist    : playlist
            });
        } else {
            res.status(400).send({
                message : 'Playlist selected with id:' + req.params.id + ' was not found',
            });
        }
    }, function(err) {
        res.status(400).send(err);
    });
};

var PlaylistDelete = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id})
    .then(function(playlist) {
        if (playlist) {
            playlist.destroy().then(function() {
                res.status(200).send({message : 'Playlist correctly deleted'});
            });
        } else {
            res.status(400).send({message : 'Error no playlist deleted'});
        }
    }, function(err) {
        res.status(400).send(err);
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
