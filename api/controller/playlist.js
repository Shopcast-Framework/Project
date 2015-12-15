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

var PlayListController = {
    get : PlayListGet,
    post: PlayListPost
};

module.exports = PlayListController;
