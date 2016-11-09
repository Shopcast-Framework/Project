'use strict';

var Status  = require(process.env.NODE_PATH + '/config/status.json'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    Parser  = require('body-parser');

var BodyParserMiddleWare = function() {
    var self = this;

    self.run = function(req, res, next) {
        var mode = this && this.mode;

        if (!mode) {
            Parser.json()(req, res, next);
        } else {
            Parser.raw({type: '*/*'})(req, res, next);
        }
    };
};

module.exports = {
    name: 'bodyparser',
    object: new BodyParserMiddleWare()
};
