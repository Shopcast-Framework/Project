'use strict';

var fs      = require('fs'),
    path    = require('path'),
    Q       = require('Q');

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

var DatabaseCleaner = function() {
    var self = this;

    self.init = function() {
        self.orm = require('../orm');
    };

    self.clean = function() {
        var bulks = [];
        var files = fs.readdirSync(path.join(__dirname, 'fixtures'));
        files.forEach(function(fileName) {
            self.orm.db[
                path.basename(fileName, '.json').capitalize()
            ].truncate();
        });
        files.forEach(function(fileName) {
            var bulk = self.orm.db[
                path.basename(fileName, '.json').capitalize()
            ].bulkCreate(
                require(path.join(__dirname, 'fixtures', fileName))
            );
            bulks.push(bulk);
        });
        return Q.when(Q.all(bulks), function() {});
    }

    self.init();
    return self;
};

module.exports = new DatabaseCleaner();
