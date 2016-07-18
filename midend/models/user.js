'use strict';

var Sequelize   = require('sequelize'),
    jwt         = require('jsonwebtoken'),
    orm         = require(process.env.NODE_PATH + '/modules/orm'),
    Mailer      = require(process.env.NODE_PATH + '/modules/mailer');

var User = function(sequelize) {
    var model = sequelize
    .define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username        : Sequelize.STRING,

        name            : Sequelize.STRING,
        avatar          : Sequelize.STRING,
        email           : Sequelize.STRING,
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
        reset_token     : Sequelize.STRING,
        last_connection : Sequelize.DATE
    }, {
        underscored: true,
        instanceMethods: {
            authenticate: function() {
                this.token = jwt.sign(this.username, '/*986_@$*#[sdaw<!+');
                this.updateAttributes({last_connection: new Date()});
            },
            resetPassword: function(done) {
                var self = this;
                self.updateAttributes({
                    reset_token: jwt.sign(this.username, '/*245_%@$è=mgys<(+')
                }).then(function(user) {
                    self = user;
                    Mailer.send(
                        self.mail,
                        Mailer.Template.create(self)
                    );
                    done(null);
                });
            },
            updatePassword: function(new_password, done) {
                var self = this;

                jwt.verify(self.reset_token, '/*245_%@$è=mgys<(+', function(err, decoded) {
                    if (err) {
                        return done(err);
                    }
                    if (decoded !== self.username) {
                        return done({message: 'Error: Invalid token'});
                    }
                    self.updateAttributes({password: new_password});
                    return done(null);
                });
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
        model.belongsTo(orm.db.Group, {constraints: false});
        model.hasOne(orm.db.Friend, {constraints: false});
        model.belongsToMany(orm.db.User, {as: 'Friends', through: 'Friend', constraints: false});
        model.hasMany(orm.db.Playlist, {constraints: false});
        model.hasMany(orm.db.File, {constraints: false});
        model.hasMany(orm.db.Planning, {constraints: false});
    };

    return {
        definition      : model,
        relationships   : relationships
    };
};

module.exports = User;
