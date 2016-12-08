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

    self._options = function(method, resource, headers) {
        var options = {
            host: 'localhost',
            hostname: 'localhost',
            path: '/api/' + resource,
            port: '3001',
            method: method,
            headers: {
                'content-type': 'application/json'
            }
        };
        if (self.cookie) {
            options.headers.cookie = self.cookie;
        }

        if (self.user) {
            options.headers.Authorization = 'Bearer ' + self.user.token;
        }
        if (headers) {
            for (var k in headers) {
                options.headers[k] = headers[k];
            }
        }
        return options;
    }

    self.call = function(method, resource, body, headers) {
        var defer = Q.defer(),
            httpRequest,
            options = self._options(method, resource, headers);

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

    self.get = function(resource, headers) {
        return self.call('get', resource);
    };

    self.post = function(resource, body, headers) {
        return self.call('post', resource, body);
    };

    self.put = function(resource, body, headers) {
        return self.call('put', resource, body);
    };

    self.delete = function(resource, body, headers) {
        return self.call('delete', resource, body);
    };

    return this;
};

module.exports = new Rest();
