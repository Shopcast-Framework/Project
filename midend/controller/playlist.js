'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Planning    = orm.db.Planning,
    Playlist    = orm.db.Playlist,
    PlaylistFile    = orm.db.PlaylistFile,
    User        = orm.db.User,
    File        = orm.db.File;

var PlaylistAdd = function(req, res) {
    req.user
    .getOnePlaylist({
        id: req.params.id
    }, {
        include : [{
            model : File,
            as: 'files',
            order : ['rank', 'ASC']
        }]
    })
    .then(function(playlist) {
        if (!playlist) {
            return res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:add:failure")});
        }
        playlist.add(req.user.id, req.body).then(function() {
            res.status(Status.OK).send({message:Message.get("playlist:add:success")});
        }, function() {
            res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:add:failure")});
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlaylistSub = function(req, res) {
    PlaylistFile
    .destroy({
        where : {
            playlist_id : req.params.id,
            file_id     : req.params.file_id
        },
        force : true
    })
    .then(function(result) {
        console.log(result);
        if (!result) {
            return res.status(Status.UNAUTHORIZED).send({
                message : Message.get("playlist:sub:failure")
            });
        }
        res.status(Status.OK).send({
            message : Message.get("playlist:sub:success")
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlaylistSort = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id})
    .then(function(playlist) {
        if (!playlist) {
            return res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:sort:failure")});
        }
        playlist.sort(req.user.id, req.body).then(function() {
            res.status(Status.OK).send({message:Message.get("playlist:sort:success")});
        }, function() {
            res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:sort:failure")});
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlayListPut = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id})
    .then(function(playlist) {
        if (!playlist) {
            return res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:put:failure")})
        }
        playlist
        .updateAttributes(req.body)
        .then(function(playlist) {
            if (!playlist) {
                return res.status(Status.UNAUTHORIZED).send({message:Message.get("playlist:put:failure")})
            }
            res.status(Status.OK).send({
                message     : Message.get("playlist:put:success"),
                playlist    : playlist
            });
        }, function(err) {
            res.status(Status.UNAUTHORIZED).send({message: err.toString()});
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlayListGet = function(req, res) {
    req.user
    .getPlaylists({
        include: [{
            model: File,
            as: 'files'
        }, {
            model: Planning,
            as: 'plannings'
        }]
    })
    .then(function(playlists) {
        res.status(Status.OK).send({
            message     : Message.get("playlist:get:success"),
            playlists   : playlists
        });
    }, function (err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlayListPost = function(req, res) {
    req.user
    .createPlaylist(req.body)
    .then(function(playlist) {
        res.status(Status.OK).send({
            message     : Message.get("playlist:post:success"),
            playlist    : playlist
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlaylistGetOne = function(req, res) {
    Playlist.findOne({
        where: {
            id      : req.params.id,
            user_id : req.user.id
        },
        include: [{
            model: File,
            as: 'files'
        }, {
            model: Planning,
            as: 'plannings'
        }]
    })
    .then(function(playlist) {
        if (playlist) {
            res.status(Status.OK).send({
                message     : Message.get("playlist:getone:success", req.params.id),
                playlist    : playlist
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("playlist:getone:failure", req.params.id)});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlaylistDelete = function(req, res) {
    req.user
    .getOnePlaylist({id: req.params.id})
    .then(function(playlist) {
        if (playlist) {
            playlist.destroy().then(function() {
                res.status(Status.OK).send({message : Message.get("playlist:delete:success")});
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("playlist:delete:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var PlayListController = {
    get     : PlayListGet,
    post    : PlayListPost,
    put     : PlayListPut,
    getOne  : PlaylistGetOne,
    delete  : PlaylistDelete,
    add     : PlaylistAdd,
    sub     : PlaylistSub,
    sort    : PlaylistSort
};

module.exports = PlayListController;
