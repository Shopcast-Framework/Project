"use strict";

module.exports = function(sequelize, DataTypes) {
  
  var User = sequelize.define('users', 
    {
      id: { type: DataTypes.INTEGER, field: "id", primaryKey: true },
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      instagramId: { type: DataTypes.INTEGER, field: "instagram_id" },
      instagramToken: { type: DataTypes.STRING, field: "instagram_token" },
      instagramUsername: { type: DataTypes.STRING, field: "instagram_username" },
      instagramPicture: { type: DataTypes.STRING, field: "instagram_picture" },
      instagramName: { type: DataTypes.STRING, field: "instagram_name" },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    },
    {
      timestamps: false
    }
  );

  return User;
};