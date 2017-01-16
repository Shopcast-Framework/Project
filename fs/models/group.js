'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var Group = function(sequelize) {
    var model = sequelize
    .define('Group', {
        name:   Sequelize.STRING
    }, {underscored: true});

    var relationships = function() {
        model.hasMany(orm.db.User, {constraints: false});
    }

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = Group;
