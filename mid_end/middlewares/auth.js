'use strict';

var AuthMiddleWare = function() {
    var self = this;

    self.run = function(req, res, next) {
        if (!req.user) {
            return res.status(400).send({
                message: 'Error: Need to authenticate'
            });
        }
        req.user.verify(req.get('Authorization'), function(err) {
            if (err) {
                return res.status(400).send(err);
            }
            next();
        });
    };
};

module.exports = {
    name: 'auth',
    object: new AuthMiddleWare()
};
