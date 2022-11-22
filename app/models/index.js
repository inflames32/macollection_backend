const User = require("./user");
const Album = require("./album");

/* Associations */
User.hasMany(Album, {
  as: "album",
  foreignKey: "user_id",
  /* through: User_has_albums, */
  /*  otherKey: "album_id",
    timestamps: false, */
});

Album.belongsTo(User, {
  as: "users",
  foreignKey: "album_id",
});

module.exports = { User, Album };
