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
    db.createTable('Histories', {
        id: { type: 'int', primaryKey: true },
        playlist_id: 'int',
        monitor_id: 'int',
        user_id: 'int',
        created_at: 'date',
        updated_at: 'date'
    }, callback);
};

exports.down = function(db) {
    return db.dropTable('histories');
};
