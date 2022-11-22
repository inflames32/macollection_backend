const { DataTypes } = require("sequelize");

const sequelize = require("../db/db");

const User = sequelize.define(
  "user",
  {
    /* id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, */
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

/* sequelize.sync(); */

module.exports = User;
