'use strict';

var orm     = require(process.env.NODE_PATH + '/modules/orm'),
    Music   = orm.db.Music;

var MusicGet = function(req, res) {
    Music
    .all()
    .then(function(musics) {
        res.status(200).send({
            message : 'List of musics',
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
                message : 'Music successfully created',
                music   : music
            });
        } else {
            res.status(400).send({
                message : "Error can't create music"
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
