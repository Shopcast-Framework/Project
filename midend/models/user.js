'use strict';

var Sequelize   = require('sequelize'),
    jwt         = require('jsonwebtoken'),
    orm         = require(process.env.NODE_PATH + '/modules/orm');

var User = function(sequelize) {
    var model = sequelize
    .define('User', {
        username        : Sequelize.STRING,
        description     : Sequelize.STRING,
        age             : Sequelize.STRING,
        sex             : Sequelize.STRING,
        location        : Sequelize.STRING,
        password        : Sequelize.STRING,
        token           : Sequelize.VIRTUAL,
        role            : Sequelize.INTEGER,
        type            : Sequelize.INTEGER,
        facebookId      : Sequelize.STRING,
        googleId        : Sequelize.STRING,
        last_connection : Sequelize.DATE
    }, {
        underscored: true,
        instanceMethods: {
            authenticate: function() {
                this.token = jwt.sign(this.username, '/*986_@$*#[sdaw<!+');
                this.updateAttributes({last_connection: new Date()});
            },
            verify: function(token, done) {
                var self = this;
                jwt.verify(token, '/*986_@$*#[sdaw<!+', function(err, decoded) {
                    if (err) {
                        return done(err);
                    }
                    if (decoded !== self.username) {
                        return done({message: 'Error: Invalid token'});
                    }
                    return done(null);
                });
            },
            getOnePlaylist: function(where, params) {
                var self = this;
                if (!params) {
                    params = {}
                }
                params.where = where;
                return orm.db.Playlist.find(params);
            },
            getOnePlanning: function(where, params) {
                var self = this;
                if (!params) {
                    params = {}
                }
                params.where = where;
                return orm.db.Planning.find(params);
            }
        }
    });

    var relationships = function() {
        model.belongsToMany(orm.db.User, {as: 'friends', through: 'Friend'});
        model.hasMany(orm.db.Playlist);
        model.hasMany(orm.db.File);
        model.hasMany(orm.db.Planning);
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = User;
