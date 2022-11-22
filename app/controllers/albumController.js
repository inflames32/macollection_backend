const Album = require("../models/Album");

const albumController = {
  getAlbums: async (req, res) => {
    const albums = await Album.findAll();
    if (albums) {
      res.json({ albums: albums });
      console.log(albums);
    }
  },
  getOneAlbumByID: async (req, res) => {
    const albumID = req.params.id;
    console.log(typeof albumID);
    /*    const albumIDToString = albumID.toString();
    console.log(albumIDToString); */
    try {
      const album = await Album.findOne({
        where: {
          id: albumID,
        },
      });
      if (album === null) {
        console.log("not found!");
      } else {
        console.log(album);
        res.status(200).json({
          album: album,
        });
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
  addOneAlbum: async (req, res) => {
    const { title, band, year } = req.body;
    await Album.findOrCreate({
      where: { title: title },
    });
    if (title) {
      res.status(400).json({ album: `can't create, exists` });
    } else {
      await album.create({
        titel: title,
        band: band,
        year: year,
      });
      res.status(200).json({ album: "created", album });
    }
  },
};
module.exports = albumController;
