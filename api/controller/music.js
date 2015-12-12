'use strict';

var MusicGet = function(req, res) {
    res.send('Music: GET');
};

var MusicPost = function(req, res) {
    res.send('Music: POST');
};

var MusicSearch = function(req, res) {
    res.send('Music: SEARCH -> ' + req.params.id);
};

var MusicController = {
    get: MusicGet,
    post: MusicPost,
    search : MusicSearch
};

module.exports = MusicController;
