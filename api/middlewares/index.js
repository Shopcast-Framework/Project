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
                console.log(middleware);
                self.middlewares[middleware.name] = middleware.object;
            }
        });
    };

    self.load = function(names) {
        var middlewares = [];
        console.log('\tNAMES:');
        for (var i in names) {
            var name = names[i];
            if (self.middlewares[name])
                middlewares.push(self.middlewares[name].run);
        }
        return middlewares;
    };

    self.init();
    return self;
};

exports.load = MiddlewaresLoader;
