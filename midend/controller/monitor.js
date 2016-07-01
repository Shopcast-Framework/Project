'use strict';

var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    User        = orm.db.User,
    Monitor     = orm.db.Monitor;

var MonitorOption = function(req, res) {
    return res.status(Status.OK).send();
}

var MonitorAssociate = function(req, res) {
    Monitor
    .find({
        where: {
            uid: req.body.uid
        },
        include: [{model: User, as: 'user'}]
    }).then(function(monitor) {
        if (monitor) {
            monitor.user.authenticate();
            return res.status(Status.OK).send({
                message : Message.get("monitor:associate:success"),
                user    : monitor.user
            });
        }
        res.status(Status.UNAUTHORIZED).send({
            message : Message.get("monitor:associate:failure")
        });
    }, function(err) {
        return res.status(Status.UNAUTHORIZED).send(err);
    })
};

var MonitorPut = function(req, res) {
    Monitor
    .findById(req.params.id)
    .then(function(monitor) {
        if (!monitor) {
            return res.status(Status.UNAUTHORIZED).send({message:Message.get("monitor:put:failure")})
        }
        monitor
        .updateAttributes(req.body)
        .then(function(monitor) {
            if (!monitor) {
                return res.status(Status.UNAUTHORIZED).send({message:Message.get("monitor:put:failure")})
            }
            res.status(Status.OK).send({
                message     : Message.get("monitor:put:success"),
                monitor     : monitor
            });
        }, function(err) {
            res.status(Status.UNAUTHORIZED).send(err);
        });
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var MonitorGet = function(req, res) {
    Monitor
    .all()
    .then(function(monitors) {
        res.status(Status.OK).send({
            message     : Message.get("monitor:get:success"),
            monitors    : monitors
        });
    }, function (err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var MonitorPost = function(req, res) {
    req.body.user_id = req.user.id;
    Monitor
    .create(req.body)
    .then(function(monitor) {
        console.log("MONITOR ADDED");
        res.status(Status.OK).send({
            message     : Message.get("monitor:post:success"),
            monitor     : monitor
        });
    }, function(err) {
        console.log(err);
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var MonitorGetOne = function(req, res) {
    Monitor
    .findById(req.params.id)
    .then(function(monitor) {
        if (monitor) {
            res.status(Status.OK).send({
                message     : Message.get("monitor:getone:success", req.params.id),
                monitor     : monitor
            });
        } else {
            res.status(Status.UNAUTHORIZED).send({message : Message.get("monitor:getone:failure")});
        }
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var MonitorDelete = function(req, res) {
    Monitor
    .destroy({
        where: {id: req.params.id}
    })
    .then(function() {
        res.status(Status.OK).send({message : Message.get("monitor:delete:success")});
    }, function(err) {
        res.status(Status.UNAUTHORIZED).send(err);
    });
};

var MonitorController = {
    get         : MonitorGet,
    post        : MonitorPost,
    put         : MonitorPut,
    getOne      : MonitorGetOne,
    delete      : MonitorDelete,
    associate   : MonitorAssociate,
    option      : MonitorOption
};

module.exports = MonitorController;
