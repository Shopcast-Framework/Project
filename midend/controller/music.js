'use strict';

var orm     = require(process.env.NODE_PATH + '/modules/orm'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    Music   = orm.db.Music;

var MusicGet = function(req, res) {
    Music
    .all()
    .then(function(musics) {
        res.status(200).send({
            message : Message.get('music:get:success'),
            musics  : musics
        });
    }, function(err) {
        res.status(400).send(err);
    });
};

var MusicPost = function(req, res) {
    Music
    .create(req.body)
    .then(function(music) {
        if (music) {
            res.status(200).send({
                message : Message.get('music:post:success'),
                music   : music
            });
        } else {
            res.status(400).send({
                message : Message.get('music:post:failure'),
            });
        }
    }, function(err) {
        res.status(400).send(err);
    });
};

var MusicSearch = function(req, res) {
    res.status(200).send('Music: SEARCH -> ' + req.params.id);
};

var MusicGetOne = function(req, res) {
    res.status(200).send('Music/:id: GET');
};

var MusicController = {
    get     : MusicGet,
    post    : MusicPost,
    getOne  : MusicGetOne,
    search  : MusicSearch
};

module.exports = MusicController;
