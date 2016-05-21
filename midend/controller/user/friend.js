'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    User        = orm.db.User,
    Friend      = orm.db.Friend,
    Q           = require('q');

var FriendPut = function(req, res) {
    Friend.find({
        where: {
            user_id: req.params.user_id,
            friend_id: req.params.id
        }
    }).then(function(friend) {
        if (friend == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get("friend:put:failure")
            });
        }
        friend.updateAttributes(req.body).then(function(friend) {
            if (friend == null) {
                return res.status(Status.UNAUTHORIZED).send({
                    message: Message.get("friend:put:failure")
                });
            }
            res.status(Status.OK).send({
                message: Message.get("friend:put:success")
            });
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
}

var FriendPost = function(req, res) {
    Q.all([
        User.findById(req.params.user_id),
        User.findById(req.body.friend_id)
    ]).then(function(users) {
        if (users[0] == null || users[1] == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get("friend:post:failure")
            });
        }
        Q.all([
            users[0].addFriend(users[1], { accepted : true }),
            users[1].addFriend(users[0], { accepted : false })
        ]).then(function() {
            res.status(Status.OK).send({
                message: Message.get("friend:post:success")
            });
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var FriendGet = function(req, res) {
    if (req.params.user_id != req.user.id) {
        return res.status(Status.UNAUTHORIZED).send({
            message: Message.get("friend:get:failure")
        });
    }
    req.user.getFriends().then(function(friends) {
        if (friends == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get("friend:get:failure")
            });
        }
        res.status(Status.OK).send({
            message: Message.get("friend:get:success"),
            friends: friends
        });
    });
}

var FriendController = {
    get     : FriendGet,
    put     : FriendPut,
    post    : FriendPost
};

module.exports = FriendController;
