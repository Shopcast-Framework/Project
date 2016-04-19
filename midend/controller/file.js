'use strict';

var orm         = require('../orm'),
    File        = orm.db.File;

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
    File
    .create(req.body)
    .then(function(file) {
        res.status(200).send({
            message : 'File successfully created',
            file    : file
        });
    });
};

var FileGetOne = function(req, res) {
    File
    .find({
        where: {id: req.params.id}
    })
    .then(function(file) {
        if (file) {
            res.status(200).send({
                message     : 'File selected with id:' + req.params.id,
                file        : file
            });
        }
        else {
            res.status(400).send({
                message : 'File selected with id:' + req.params.id + ' was not found',
            });
        }
    });
};

var FilePut = function(req, res) {
    console.log('FILE PUT ======================');
    console.log(req.body);
    File
    .find({
        where: {id: req.params.id}
    })
    .then(function(file) {
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
