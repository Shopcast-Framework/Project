var http = require('http'),
    Q = require('q');

var Rest = function() {
    'use strict';

    var self = this;

    self.call = function(method, resource, body) {
        var defer = Q.defer(),
            httpRequest,
            options = {
                hostname: 'localhost',
                path: '/api/' + resource,
                port: '3000',
                method: method,
                headers: {
                    'content-type': 'application/json'
                }
            };

        console.log('Je requete sur: ' + options.path);
        httpRequest = http.request(options, function(res) {
            var response = null;

            res.setEncoding('utf8');
            res.on('data', function(res) {
                response = res;
            });

            res.on('end', function() {
                defer.resolve(response);
            });
        });

        httpRequest.on('error', function(error) {
            defer.reject(error);
        });

        if (body) {
            httpRequest.write(body);
        }
        httpRequest.end();

        return defer.promise;
    };

    self.get = function(resource) {
        return self.call('get', resource);
    };

    self.post = function(resource, body) {
        return self.call('post', resource, body);
    };

    return this;
};

module.exports = new Rest();
