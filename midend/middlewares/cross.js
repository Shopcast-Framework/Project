'use strict';

var CrossMiddleWare = function() {
    var self = this;

    self.run = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'content-type');
        next();
    };
};

module.exports = {
    name: 'cross',
    object: new CrossMiddleWare()
};
