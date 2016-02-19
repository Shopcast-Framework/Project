'use strict';

var MusicGet = function(req, res) {
    console.log('GET MUSIC');
    res.status(200).send('Music: GET');
};

var MusicPost = function(req, res) {
    res.status(200).send('Music: POST');
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
