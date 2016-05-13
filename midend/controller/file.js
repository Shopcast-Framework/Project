'use strict';

var orm         = require(process.env.NODE_PATH + '/modules/orm'),
    File        = orm.db.File;

var FileGet = function(req, res) {
    File
    .all()
    .then(function(files) {
        res.status(200).send({
            message     : 'List of files',
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
                message: "Error : Can't create file"
            });
        }
        res.status(200).send({
            message : 'File successfully created',
            file    : file
        });
    }, function(err) {
        res.status(300).send(err);
    });
};

var FileGetOne = function(req, res) {
    File
    .find({
        where: {id: req.params.id}
    })
    .then(function(file) {
        if (file == null) {
            return res.status(400).send({
                message : 'File selected with id:' + req.params.id + ' was not found',
            });
        }
        res.status(200).send({
            message     : 'File selected with id:' + req.params.id,
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
                message: "Error : Can't find file"
            });
        }
        file.updateAttributes(req.body).then(function(file) {
            res.status(200).send({
                message     : 'File correctly updated',
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
    .then(function() {
        res.status(200).send({message : 'File correctly deleted'});
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
