'use strict';

var fs          = require('fs'),
    path        = require('path'),
    Q           = require('Q'),
    CamelCase   = require('uppercamelcase');

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

var DatabaseCleaner = function(orm) {
    var self = this;

    self.init = function(orm) {
        self.orm = orm
    };

    self.keepAuthToken = function(blob, options) {
        blob[0].token = options.token;
        return blob;
    };

    self.getBlob = function(fileName, options) {
      var blob = require(path.join(__dirname, 'fixtures', fileName));
      if (fileName === 'user.json') {
          return self.keepAuthToken(blob, options);
      }
      return blob;
    }

    self.clean = function(options) {
        var bulks = [];
        var files = fs.readdirSync(path.join(__dirname, 'fixtures'));
        files.forEach(function(fileName) {
            self.orm.db[
                CamelCase(path.basename(fileName, '.json'))
            ].truncate();
        });
        files.forEach(function(fileName) {
            var bulk = self.orm.db[
                CamelCase(path.basename(fileName, '.json'))
            ].bulkCreate(
                self.getBlob(fileName, options)
            );
            bulks.push(bulk);
        });
        return Q.when(Q.all(bulks), function() {}, function(err) {
            console.log(err);
            throw err;
        });
    }

    self.init(orm);
    return self;
};

module.exports = function(orm) {
    return new DatabaseCleaner(orm);
}
