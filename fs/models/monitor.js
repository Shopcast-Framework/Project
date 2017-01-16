'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var Monitor = function(sequelize) {
    var model = sequelize
    .define('Monitor', {
        name:   Sequelize.STRING,
        uid: Sequelize.STRING
    }, {underscored: true});

    var relationships = function() {
        model.hasOne(orm.db.Planning, {constraints: false});
        model.belongsTo(orm.db.User, {constraints: false, as: 'user'});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = Monitor;
