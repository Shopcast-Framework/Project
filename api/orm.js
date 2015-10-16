'use strict';

var Sequelize   = require('sequelize'),
    path        = require('path'),
    fs          = require('fs');

var Orm = function() {
    var self = this;

    self.init = function() {
        self.sequelize = new Sequelize('shopcast', 'root', 'password');
        self.db = {};

        fs
        .readdirSync(path.join(__dirname, './models'))
        .forEach(function(fileName) {
            var model = self.sequelize.import(path.join(__dirname, './models', fileName));
            self.db[model.name] = model;
        });
    };

    self.init();
};

exports.load = Orm;
