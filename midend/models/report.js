'use strict';

var Sequelize   = require('sequelize'),
    orm         = require('../orm');

var Report = function(sequelize) {

    var model = sequelize
    .define('Report', {
        //file_id     : Sequelize.INTEGER,
        time        : Sequelize.DATE,
        audience    : Sequelize.INTEGER,
        //monitor_id  : Sequelize.INTEGER
    }, {underscored: true});

    var relationships = function() {
        model.belongsTo(orm.db.File);
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = Report;
