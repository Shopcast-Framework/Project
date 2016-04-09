'use strict';

var orm         = require('../orm'),
    Playlist    = orm.db.Playlist,
    File        = orm.db.File;

var PlayListPut = function(req, res) {
    Playlist
    .find({
        where: {id: req.params.id}
    })
    .then(function(playlist) {
        playlist.updateAttributes(req.body).then(function(playlist) {
            res.status(200).send({
                message     : 'Playlist correctly updated',
                playlist    : playlist
            });
        }, function(err) {
            res.status(300).send(err);
        });
    });
};

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
    Playlist
    .find({
        where: {id: req.params.id},
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
        }
        else {
            res.status(400).send({
                message : 'Playlist selected with id:' + req.params.id + ' was not found',
            });
        }
    });
};

var PlaylistDelete = function(req, res) {
    Playlist
    .destroy({
        where: {id: req.params.id}
    })
    .then(function() {
        res.status(200).send({message : 'Playlist correctly deleted'});
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
