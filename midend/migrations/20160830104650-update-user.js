'use strict';

var dbm;
var type;
var seed;

/**
* We receive the dbmigrate dependency from dbmigrate initially.
* This enables us to not have to rely on NODE_PATH.
*/
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db, callback) {
    db.addColumn('Users', 'token',  {
        type: 'varchar',
        notNull: false,
        primaryKey: false,
        autoIncrement: false,
        length: 255
    }, callback);
    return null;
};

exports.down = function(db) {
    return null;
};
