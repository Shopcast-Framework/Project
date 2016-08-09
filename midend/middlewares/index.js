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

    self.only = function(descriptor, action) {
        if (!descriptor.only)
            return (true);
        return (descriptor.only.indexOf(action) !== -1);
    };

    self.load = function(action, descriptors) {
        var middlewares = [];
        var name, param;
        for (var i in descriptors) {
            var descriptor = descriptors[i];

            name = descriptor.name;
            param = descriptor.param;
            if (self.only(descriptor, action) && self.middlewares[name]) {
                var middleware = self.middlewares[name].run;

                if (typeof(middleware) == 'function') {
                    middlewares.push(middleware.bind(param));
                } else {
                    for (var i in middleware) {
                        middlewares.push(middleware[i].bind(param));
                    }
                }
            }
        }
        return middlewares;
    };

    self.useModules = UseModules;
    self.init();
    return self;
};

exports.load = MiddlewaresLoader;
