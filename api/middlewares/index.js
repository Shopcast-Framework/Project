'use strict';

var path        = require('path'),
    fs          = require('fs');

var MiddlewaresLoader = function() {
    var self = this;

    self.init = function() {
        var middleware;
        self.middlewares = {};

        fs
        .readdirSync(path.join(__dirname))
        .forEach(function(fileName) {
            if (fileName !== 'index.js') {
                middleware = require(path.join(__dirname, fileName));
                self.middlewares[middleware.name] = middleware.object;
            }
        });
    };

    self.load = function(action, descriptors) {
        var middlewares = [];
        var name;
        for (var i in descriptors) {
            var descriptor = descriptors[i];

            if (typeof(descriptor) === 'object') {
                name = descriptor.name;
                if (descriptor.only.indexOf(action) !== -1 && self.middlewares[name]) {
                    middlewares.push(self.middlewares[name].run);
                }
            }

            if (typeof(descriptor) === 'string') {
                name = descriptor;
                if (self.middlewares[name])
                    middlewares.push(self.middlewares[name].run);
            }
        }
        return middlewares;
    };

    self.init();
    return self;
};

exports.load = MiddlewaresLoader;
