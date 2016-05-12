'use strict';

var Sequelize   = require('sequelize'),
    path        = require('path'),
    fs          = require('fs'),
    config      = require('./config/db.json')[process.env.NODE_ENV];

if (config == undefined) {
    throw "Error can't retrieve configuration";
}

var Orm = function() {
    var self = this;

    self.init = function() {
        var relationships = [],
            model;

        self.sequelize = new Sequelize(config.database, config.username, config.password);
        self.db = {};

        fs
        .readdirSync(path.join(__dirname, './models'))
        .forEach(function(fileName) {
            model = self.sequelize.import(path.join(__dirname, './models', fileName));
            self.db[model.definition.name] = model.definition;
            if (model.relationships)
                relationships.push(model.relationships);
        });

        for (var i in relationships) {
            relationships[i]();
        }

        self.sequelize.sync();
    };

    self.init();
    return self;
};

exports.load = Orm;
