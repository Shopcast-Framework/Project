"use strict";

module.exports = function(sequelize, DataTypes) {
  
  var User = sequelize.define('menu', 
    {
      id: { type: DataTypes.INTEGER, field: "id", primaryKey: true },
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      url: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
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