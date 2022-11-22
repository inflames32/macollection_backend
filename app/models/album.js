const { DataTypes } = require("sequelize");

const db = require("../db/db");

const Album = db.define(
  "album",
  {
    /*  id: {
      type: DataTypes.STRING,
      primaryKey: true,
    }, */
    title: DataTypes.TEXT,
    band: DataTypes.STRING,
    cover_url: DataTypes.TEXT,
    year: DataTypes.INTEGER,

    /* createdAt: "created_at",
  updatedAt: "updated_at", */
  },
  {
    timestamps: false,
  }
);

module.exports = Album;
