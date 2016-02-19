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
    res.send('File/:id: GET');
};

var FileController = {
    get     : FileGet,
    post    : FilePost,
    getOne  : FileGetOne
};

module.exports = FileController;
