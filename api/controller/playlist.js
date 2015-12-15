'use strict';

var orm         = require('../orm'),
    Playlist    = orm.db.Playlist;

var PlayListGet = function(req, res) {
    Playlist
    .all()
    .then(function(playlists) {
        res.status(200).send({
            message     : 'List of playlists',
            playlists   : playlists
        });
    });
};

var PlayListPost = function(req, res) {
    Playlist
    .create(req.body)
    .then(function(playlist) {
        res.status(200).send({
            message     : 'Playlist successfully created',
            playlist    : playlist
        });
    });
};

var PlaylistGetOne = function(req, res) {
    Playlist.findById(req.params.id)
    .then(function(playlist) {
        if (playlist) {
            res.status(200).send({
                message     : 'Playlist selected with id:' + req.params.id,
                playlist    : playlist
            });
        }
        else {
            res.status(400).send({
                message : 'Playlist selected with id:' + req.params.id + ' was not found',
            });
        }
    });
};

var PlayListController = {
    get     : PlayListGet,
    post    : PlayListPost,
    getOne  : PlaylistGetOne
};

module.exports = PlayListController;
