'use strict';

var orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    File        = orm.db.File;

var FileGet = function(req, res) {
    File
    .findAll({
        where: {
            user_id: req.user.id
        }
    })
    .then(function(files) {
        res.status(200).send({
            message     : Message.get("file:get:success"),
            files       : files
        });
    }, function(err) {
        res.status(300).send(err);
    });
};

var FilePost = function(req, res) {
    File
    .create(req.body)
    .then(function(file) {
        if (file == null) {
            return res.status(300).send({
                message: Message.get("file:post:failure")
            });
        }
        res.status(200).send({
            message : Message.get("file:post:success"),
            file    : file
        });
    }, function(err) {
        res.status(300).send(err);
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
            return res.status(400).send({
                message : Message.get("file:getone:failure", req.params.id)
            });
        }
        res.status(200).send({
            message     : Message.get("file:getone:success", req.params.id),
            file        : file
        });
    }, function(err) {
        res.status(300).send(err);
    });
};

var FilePut = function(req, res) {
    File
    .find({
        where: {id: req.params.id}
    })
    .then(function(file) {
        if (file == null) {
            return res.status(300).send({
                message: Message.get("file:put:failure")
            });
        }
        file.updateAttributes(req.body).then(function(file) {
            res.status(200).send({
                message     : Message.get("file:put:success"),
                file        : file
            });
        }, function(err) {
            res.status(300).send(err);
        });
    });
};

var FileDelete = function(req, res) {
    File
    .destroy({
        where: {id: req.params.id}
    })
    .then(function(result) {
        if (!result) {
            return res.status(400).send({
                message : Message.get("file:delete:failure")
            })
        }
        res.status(200).send({
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
