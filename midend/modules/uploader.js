'use strict';
var fs  = require('fs'),
    Q   = require('q'),
    Uid = require('uid-safe');

var Uploader = function() {
    var self = this;
    self.UPLOAD_DIR = process.env.NODE_PATH + '/upload/'
    self.DIR_CAP = 10

    self.gen = function() {
        return Uid.sync(10);
    }

    self.genDirectory = function() {
        var name = self.gen() + '/';
        try {
            fs.accessSync(self.UPLOAD_DIR + name, fs.F_OK)
        } catch (e) {
            fs.mkdirSync(self.UPLOAD_DIR + name)
            return name;
        }
        return self.genDirectory()
    }

    self.findDirectory = function() {
        var defer = Q.defer();
        var files = fs.readdirSync(self.UPLOAD_DIR)
        for (var i in files) {
            var file = files[i] + '/';
            if (file[0] === '.') { continue }
            var _files = fs.readdirSync(self.UPLOAD_DIR + file)
            if (_files.length < self.DIR_CAP) {
                return file;
            }
        }
        return self.genDirectory();
    }

    self.generateFileName = function(directoryPath) {
        return self.gen();
    }

    self.upload = function(data) {
        var defer = Q.defer();
        var directoryPath = self.findDirectory();
        var fileName = self.generateFileName(directoryPath)
        var filePath = directoryPath + fileName;
        fs.writeFile(self.UPLOAD_DIR + filePath, data, function(err) {
            if (err) {
                return defer.reject(err)
            }
            defer.resolve(filePath, fileName)
        });
        return defer.promise;
    }

    return self;
};

module.exports = new Uploader();
