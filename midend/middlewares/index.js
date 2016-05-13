'use strict';

var path        = require('path'),
    fs          = require('fs');

var UseModules = function(app) {
    app.use(require('cookie-parser')());
    app.use(require('body-parser').json());
};

var MiddlewaresLoader = function() {
    var self = this;

    self.init = function() {
        var middleware;
        self.middlewares = {};

        fs
        .readdirSync(path.join(process.env.NODE_PATH, '/middlewares'))
        .forEach(function(fileName) {
            if (fileName !== 'index.js') {
                middleware = require(path.join(process.env.NODE_PATH, '/middlewares', fileName));
                self.middlewares[middleware.name] = middleware.object;
            }
        });
    };

    self.useModules = UseModules;

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
