'use strict';

var PlayListGet = function(req, res) {
    res.send('Playlist: GET');
};

var PlayListPost = function(req, res) {
    res.send('Playlist: POST');
};

var PlayListController = {
    get : PlayListGet,
    post: PlayListPost
};

module.exports = PlayListController;
