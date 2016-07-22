'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm     = require(process.env.NODE_PATH + '/modules/orm'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    User    = orm.db.User;

var UserBlock = function(req, res) {
    User
    .findById(req.params.id)
    .then(function(user) {
        if (user && user.role == 1) {
            user.updateAttributes({
                role : -1
            }).then(function(user) {
                res.status(Status.OK).send({
                    message     : Message.get("user:block:success"),
                    user        : user
                });
            }, function(err) {
                res.status(Status.UNAUTHORIZED).send({message: err.toString()});
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("user:block:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var UserUnblock = function(req, res) {
    User
    .findById(req.params.id)
    .then(function(user) {
        if (user && user.role == -1) {
            user.updateAttributes({
                role : 1
            }).then(function(user) {
                res.status(Status.OK).send({
                    message     : Message.get("user:unblock:success"),
                    user        : user
                });
            }, function(err) {
                res.status(Status.UNAUTHORIZED).send({message: err.toString()});
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("user:unblock:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });

};



var UserPut = function(req, res) {
    User
    .findById(req.params.id)
    .then(function(user) {
        if (user) {
            user.updateAttributes(req.body).then(function(user) {
                res.status(Status.OK).send({
                    message     : Message.get("user:put:success"),
                    user        : user
                });
            }, function(err) {
                res.status(Status.UNAUTHORIZED).send({message: err.toString()});
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("user:put:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var UserGet = function(req, res) {
    User
    .all()
    .then(function(users) {
        res.status(Status.OK).send({
            message : Message.get("user:get:success"),
            users : users
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var UserPost = function(req, res) {
    User
    .create(req.body)
    .then(function(user) {
        if (user) {
            res.status(Status.OK).send({
                message : Message.get("user:post:success"),
                user : user
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("user:post:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var UserGetOne = function(req, res) {
    User
    .findById(req.params.id)
    .then(function(user) {
        if (user) {
            res.status(Status.OK).send({
                message : Message.get("user:getone:success", req.params.id),
                user    : user
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({
                message : Message.get("user:getone:failure", req.params.id)
            });
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var UserDelete = function(req, res) {
    User
    .destroy({
        where: {id: req.params.id}
    })
    .then(function() {
        res.status(Status.OK).send({message : Message.get("user:delete:success")});
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var UserUpdatePassword = function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
        return res.status(Status.UNAUTHORIZED).send({message : Message.get("user:update:badconfirm")});
    }
    User.findOne({
        where: {
            reset_token: req.body.token
        }
    }).then(function(user) {
        if (!user) {
            return res.status(Status.UNAUTHORIZED).send({message : Message.get("user:update:failure")});
        }
        user.updatePassword(req.body.password, function(err) {
            if (err) {
                return res.status(Status.UNAUTHORIZED).send({message: err.toString()});
            }
            res.status(Status.OK).send({message : Message.get("user:update:success")});
        });
    });
};

var UserResetPassword = function(req, res) {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(user) {
        if (!user) {
            return res.status(Status.UNAUTHORIZED).send({message : Message.get("user:reset:nouser")});
        }
        if (!user) {
            return res.status(Status.UNAUTHORIZED).send({message : Message.get("user:reset:nouser")});
        }
        user.resetPassword(function(err) {
            if (err) {
                return res.status(Status.UNAUTHORIZED).send({message : Message.get("user:reset:failure")});
            }
            res.status(Status.OK).send({message : Message.get("user:reset:success")});
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var UserController = {
    delete  : UserDelete,
    get     : UserGet,
    post    : UserPost,
    put     : UserPut,
    getOne  : UserGetOne,
    reset   : UserResetPassword,
    update  : UserUpdatePassword,
    block   : UserBlock,
    unblock : UserBlock
};

module.exports = UserController;
