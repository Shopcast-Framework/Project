'use strict';

var Status  = require(process.env.NODE_PATH + '/config/status.json'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    Parser  = require('body-parser');

var BodyParserMiddleWare = function() {
    var self = this;
    var SIZE_MAX = '100mb';

    self.run = function(req, res, next) {
        var mode = this && this.mode;

        if (!mode) {
            Parser.json({limit: SIZE_MAX})(req, res, next);
        } else {
            Parser.raw({type: '*/*', limit: SIZE_MAX})(req, res, next);
        }
    };
};

module.exports = {
    name: 'bodyparser',
    object: new BodyParserMiddleWare()
};
