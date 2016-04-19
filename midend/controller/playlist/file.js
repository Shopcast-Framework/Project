'use strict';

var orm         = require('../../orm'),
    File        = orm.db.File,
    Playlist    = orm.db.Playlist;

var FileGet = function(req, res) {
    File
    .all()
    .then(function(files) {
        res.status(200).send({
            message     : 'List of files',
            files       : files
        });
    });
};

var FilePost = function(req, res) {
    Playlist.findOne({
        where: {id: req.params.playlist_id}
    })
    .then(function(playlist) {
        if (playlist) {
            File
            .create(req.body)
            .then(function(file) {
                file.setPlaylist(playlist).then(function () {
                    res.status(200).send({
                        message : 'File successfully created',
                        file    : file
                    });
                });
            });
        } else {
            res.status(400).send({
                message : 'This playlist do not exist'
            });
        }
    });
};

var FileGetOne = function(req, res) {
    File.findById(req.params.id)
    .then(function(file) {
        if (file) {
            res.status(200).send({
                message : 'File selected with id:' + req.params.id,
                file    : file
            });
        }
        else {
            res.status(400).send({
                message : 'File selected with id:' + req.params.id + ' was not found',
            });
        }
    });
};

var FileController = {
    get     : FileGet,
    post    : FilePost,
    getOne  : FileGetOne
};

module.exports = FileController;
