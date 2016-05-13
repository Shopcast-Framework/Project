'use strict';

var orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    File        = orm.db.File,
    Playlist    = orm.db.Playlist;

var FileGet = function(req, res) {
    File
    .all()
    .then(function(files) {
        res.status(200).send({
            message     : Message.get("file:get:success"),
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
                        message : Message.get("file:post:success"),
                        file    : file
                    });
                });
            });
        } else {
            res.status(400).send({
                message : Message.get("file:post:failure")
            });
        }
    });
};

var FileGetOne = function(req, res) {
    File.findById(req.params.id)
    .then(function(file) {
        if (file) {
            res.status(200).send({
                message : Message.get("file:getone:success", req.params.id),
                file    : file
            });
        }
        else {
            res.status(400).send({
                message : Message.get("file:getone:failure", req.params.id),
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
