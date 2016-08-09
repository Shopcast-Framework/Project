'use strict';

var Sequelize   = require('sequelize'),
    Q           = require('q'),
    path        = require('path'),
    fs          = require('fs'),
    config      = require(process.env.NODE_PATH + '/config/db.json')[process.env.NODE_ENV];

if (config == undefined) {
    throw "Error can't retrieve configuration";
}

var Orm = function() {
    var self = this;
    var defer = Q.defer();

    self.init = function() {
        var relationships = [],
            model;

        self.sequelize = new Sequelize(config.database, config.username, config.password, {
            host : config.host,
            logging : function(str) {
                fs.writeFile(process.env.NODE_PATH + '/logs/sql.log', str);
                fs.writeFile(process.env.NODE_PATH + '/logs/sql.log', "\n");
            }
        });

        self.db = {};

        fs
        .readdirSync(path.join(process.env.NODE_PATH, 'models'))
        .forEach(function(fileName) {
            model = self.sequelize.import(path.join(process.env.NODE_PATH, 'models', fileName));
            self.db[model.definition.name] = model.definition;
            if (model.relationships)
                relationships.push(model.relationships);
        });

        for (var i in relationships) {
            relationships[i]();
        }

        self.sequelize.sync().then(defer.resolve, defer.reject);
    };

    self.init();
    return defer.promise;
};

exports.load = Orm;
