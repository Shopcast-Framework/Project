'use strict';

var Sequelize   = require('sequelize'),
    jwt         = require('jsonwebtoken'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var Planning = function(sequelize) {
    var model = sequelize
    .define('Planning', {
        title       : Sequelize.STRING,
        range_start : Sequelize.DATEONLY,
        range_end   : Sequelize.DATEONLY,
        start_at    : Sequelize.TIME
    }, {underscored: true});

    var relationships = function() {
        model.belongsTo(orm.db.User, {constraints: false});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = Planning;
