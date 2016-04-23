'use strict';

var orm         = require('../../orm'),
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
            return res.status(300).send({
                message: "Error : Can't find user"
            });
        }
        friend.updateAttributes(req.body).then(function(friend) {
            if (friend == null) {
                return res.status(300).send({
                    message: "Error : Can't find user"
                });
            }
            res.status(200).send({
                message: "Friendship correctly accepted"
            });
        });
    }, function(err) {
        res.status(300).send(err);
    });
}

var FriendPost = function(req, res) {
    Q.all([
        User.findById(req.params.user_id),
        User.findById(req.body.friend_id)
    ]).then(function(users) {
        if (users[0] == null || users[1] == null) {
            return res.status(300).send({
                message: "Error : Can't find user"
            });
        }
        Q.all([
            users[0].addFriend(users[1], { accepted : true }),
            users[1].addFriend(users[0], { accepted : false })
        ]).then(function() {
            res.status(200).send({
                message: "Friendship request correctly send"
            });
        });
    }, function(err) {
        res.status(300).send(err);
    });
};

var FriendGet = function(req, res) {
    User.findById(req.params.user_id).then(function(user){
        if (user == null) {
            return res.status(300).send({
                message: "Error : Can't find user"
            });
        }
        user.getFriends().then(function(friends) {
            if (friends == null) {
                return res.status(300).send({
                    message: "Error : Can't find friends"
                });
            }
            res.status(200).send({
                message: "List of friends",
                friends: friends
            });
        });
    });
}

var FriendController = {
    get     : FriendGet,
    put     : FriendPut,
    post    : FriendPost
};

module.exports = FriendController;
