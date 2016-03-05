'use strict';

var Sequelize   = require('sequelize'),
    orm         = require('../orm');

var Timetable = function(sequelize) {

    var model = sequelize
    .define('Timetable', {
      start       : Sequelize.DATE,
      id_file     : Sequelize.INTEGER,
      id_playlist : Sequelize.INTEGER
    }, {underscored: true});

    var relationships = function() {
        model.belongsTo(orm.db.Playlist, {as: 'timetable'});
    };

    return {
        definition      : model
        //relationships   : relationships
    };
};

module.exports = Timetable;
