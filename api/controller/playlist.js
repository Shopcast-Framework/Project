'use strict';

var orm     = require('../orm'),
    User    = orm.db.User;

var PlayListGet = function(req, res) {
    User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
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
