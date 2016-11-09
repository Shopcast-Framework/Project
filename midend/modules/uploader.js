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
        //console.log("GEN DIRECTORY");
        var name = self.gen() + '/';
        try {
            fs.accessSync(self.UPLOAD_DIR + name, fs.F_OK)
        } catch (e) {
            //console.log("\tJE CREER");
            fs.mkdirSync(self.UPLOAD_DIR + name)
            //console.log("\tRESULT:", name);
            return name;
        }
        return self.genDirectory()
    }

    self.findDirectory = function() {
        var defer = Q.defer();
        //console.log("FIND DIRECTORY");
        var files = fs.readdirSync(self.UPLOAD_DIR)
        for (var i in files) {
            var file = files[i] + '/';
            //console.log("\tJAI UN FICHIER ", file);
            var _files = fs.readdirSync(self.UPLOAD_DIR + file)
            if (_files.length < self.DIR_CAP) {
                //console.log("\tTROUVER POUR ", self.UPLOAD_DIR + file);
                return self.UPLOAD_DIR + file;
            }
            //console.log("\tPAS TROUVER POUR ", self.UPLOAD_DIR + file);
        }
        return self.UPLOAD_DIR + self.genDirectory();
    }

    self.generateFileName = function(directoryPath) {
        return self.gen();
    }

    self.upload = function(data) {
        //console.log("UPLOAD");
        var defer = Q.defer();
        var directoryPath = self.findDirectory();
        var fileName = self.generateFileName(directoryPath)
        var filePath = directoryPath + fileName;
        //console.log("\tJE WRITE SUR ", filePath);
        fs.writeFile(filePath, data, function(err) {
            if (err) {
                //console.log("\tERROR", err);
                return defer.reject(err)
            }
            //console.log("\tDONE");
            defer.resolve(filePath, fileName)
        });
        return defer.promise;
    }

    return self;
};

module.exports = new Uploader();
