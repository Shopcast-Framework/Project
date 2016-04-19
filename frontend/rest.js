var http = require('http'),
    Q = require('q');

var Rest = function() {
    'use strict';

    var self = this;

    self.middleware = function (req, res, next) {
        self.user = req.session.user;
        self.cookie = req.headers.cookie;
        next();
    };

    self.call = function(method, resource, body) {
        var defer = Q.defer(),
            httpRequest,
            options = {
                hostname: 'localhost',
                path: '/api/' + resource,
                port: '3001',
                method: method,
                headers: {
                    'content-type': 'application/json',
                    'cookie': self.cookie
                }
            };
        if (self.user) {
            options.headers.Authorization = self.user.token;
        }

        console.log('Je requete sur: ' + options.path);
        httpRequest = http.request(options, function(res) {
            var datas = {
                headers: res.headers,
                body: ''
            };

            res.setEncoding('utf8');
            res.on('data', function(data) {
                datas.body += data;
            });

            res.on('end', function() {
                try {
                    datas.body = JSON.parse(datas.body);
                } catch (e) {
                    defer.reject(datas);
                }

                if (res.statusCode !== 200) {

                    defer.reject(datas);
                } else {
                    defer.resolve(datas);
                }
            });
        });

        httpRequest.on('error', function(error) {
            defer.reject(null, error);
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

    self.put = function(resource, body) {
        return self.call('put', resource, body);
    };

    self.delete = function(resource, body) {
        return self.call('delete', resource, body);
    };

    return this;
};

module.exports = new Rest();
