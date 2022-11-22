const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class User_has_albums extends Model {}

User_has_albums.init(
  {
    quantity: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "user_has_albums",
  }
);

module.exports = User_has_albums;
