'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    File        = orm.db.File;

var FileGet = function(req, res) {
    File
    .findAll({
        where: {
            user_id: req.user.id
        },
        include : [{
            model     : ormPlaylist,
            as        : 'playlists',
            required  : false
        }]
    })
    .then(function(files) {
        res.status(Status.OK).send({
            message     : Message.get("file:get:success"),
            files       : files
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var FilePost = function(req, res) {
    req.body.user_id = req.user.id;
    File
    .create(req.body)
    .then(function(file) {
        if (file == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get("file:post:failure")
            });
        }
        res.status(Status.OK).send({
            message : Message.get("file:post:success"),
            file    : file
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var FileGetOne = function(req, res) {
    File
    .find({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    })
    .then(function(file) {
        if (file == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message : Message.get("file:getone:failure", req.params.id)
            });
        }
        res.status(Status.OK).send({
            message     : Message.get("file:getone:success", req.params.id),
            file        : file
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var FilePut = function(req, res) {
    File
    .find({
        where: {id: req.params.id}
    })
    .then(function(file) {
        if (file == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get("file:put:failure")
            });
        }
        file.updateAttributes(req.body).then(function(file) {
            res.status(Status.OK).send({
                message     : Message.get("file:put:success"),
                file        : file
            });
        }, function(err) {
            res.status(Status.UNAUTHORIZED).send({message: err.toString()});
        });
    });
};

var FileDelete = function(req, res) {
    PlaylistFile.destroy({
        where : {file_id: req.params.id}
    }).
    then(function(result) {
        if (!result) {
            return res.status(Status.UNAUTHORIZED).send({
                message : Message.get("playlistfile:delete:failure")
            })
        }
        res.status(Status.OK).send({
            message : Message.get("playlistfile:delete:success")
        });
    });
    File
    .destroy({
        where: {id: req.params.id}
    })
    .then(function(result) {
        if (!result) {
            return res.status(Status.UNAUTHORIZED).send({
                message : Message.get("file:delete:failure")
            })
        }
        res.status(Status.OK).send({
            message : Message.get("file:delete:success")
        });
    });
};

var FileController = {
    delete  : FileDelete,
    get     : FileGet,
    post    : FilePost,
    put     : FilePut,
    getOne  : FileGetOne
};

module.exports = FileController;
