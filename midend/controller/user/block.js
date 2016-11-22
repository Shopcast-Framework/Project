'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    User        = orm.db.User,
    Block      = orm.db.Block,
    Q           = require('q');

var BlockPost = function(req, res) {
    Q.all([
        User.findById(req.params.user_id),
        User.findById(req.body.block_id)
    ]).then(function(users) {
        if (users[0] == null || users[1] == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get("block:post:failure")
            });
        }
        Q.all([
            users[0].addBlock(users[1], { accepted : true }),
            users[1].addBlock(users[0], { accepted : false })
        ]).then(function() {
            res.status(Status.OK).send({
                message: Message.get("block:post:success")
            });
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send({message: err.toString()});
    });
};

var BlockDelete = function(req, res) {
    Block
    .destroy({
        where : {user_id : req.params.user_id, block_id : req.params.block_id} 
    })
    .then(function() {
          if (!result) {
                return res.status(Status.UNAUTHORIZED).send({
                    message : Message.get("block:delete:failure")
                })
          }
          res.status(Status.OK).send({
                message : Message.get("block:delete:success")
          });
        
    });
};



var BlockGet = function(req, res) {
    if (req.params.user_id != req.user.id) {
        return res.status(Status.UNAUTHORIZED).send({
            message: Message.get("block:get:failure")
        });
    }
    req.user.getBlocks().then(function(block) {
        if (friends == null) {
            return res.status(Status.UNAUTHORIZED).send({
                message: Message.get("block:get:failure")
            });
        }
        res.status(Status.OK).send({
            message: Message.get("block:get:success"),
            blocks  : blocks
        });
    });
}

var BlockController = {
    delete  : BlockDelete,
    get     : BlockGet,
    post    : BlockPost
};

module.exports = BlockController;
