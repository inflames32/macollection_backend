const express = require("express");
const userController = require("./controllers/userController");
const albumController = require("./controllers/albumController");

const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
/* router.get("/logout", userController.logout); */

//user
router.get("/user/:username", userController.getUserByUsername);
//albums
router.get("/albums", albumController.getAlbums);
router.get("/albums/:id", albumController.getOneAlbumByID);
router.post("/albums/addAlbum", albumController.addAlbum);
router.delete("/albums/deleteAlbum/:id", albumController.deleteAlbum);

/* router.get("/album/:name", albumController.getAlbumByName); */

module.exports = router;
