'use strict';

var Sequelize   = require('sequelize'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var Friend = function(sequelize) {
    var model = sequelize
    .define('Friend', {
    }, {underscored: true});

    var relationships = function() {
        model.belongsTo(orm.db.User, {constraints: false});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = Friend;
