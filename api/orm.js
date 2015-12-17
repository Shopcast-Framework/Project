'use strict';

var Sequelize   = require('sequelize'),
    path        = require('path'),
    fs          = require('fs');

var Orm = function() {
    var self = this;

    self.init = function() {
        var relationships = [],
            model;

        self.sequelize = new Sequelize('shopcast', 'shopcast', 's7fCQvxr9&mKey=.' );
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
    return this;
};

exports.load = Orm;
