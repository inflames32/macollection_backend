const Album = require("../models/Album");

const albumController = {
  getAlbums: async (req, res) => {
    const albums = await Album.findAll();
    if (albums) {
      res.json({ albums: albums });
    }
  },
  getOneAlbumByID: async (req, res) => {
    try {
      console.log(req.params.id);
      if (req.params.id === "undefined") {
        return;
      }
      const album = await Album.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (album === null) {
        console.log(res.response.dat);
        return res.status(404).json({ error: "album not found!" });
      } else if (!album) {
        console.log(res.response.dat);
        return res.status(404).json({ error: "album not found!" });
      } else {
        res.status(200).json({
          album: album,
        });
        console.log(album);
      }
    } catch (err) {
      console.log(err);

      return;
    }
  },
  addAlbum: async (req, res) => {
    const { title, band, year, cover_url } = req.body;
    /*  if (title && band && year === "null" && "" && "undefined") {
      return res.status(400).json({ error: `une erreur s'est produite` });
    } */
    console.log(req.body);
    /*const newAlbum = await Album.findOrCreate({
      where: { title: title, band: band },
    });
    if (newAlbum) {
      console.log({ error: "album exists" });
      res.status(400).json({ album: `can't create, exists` });
      return;
    } else {*/
    const newAlbum = await Album.create({
      title: title,
      band: band,
      year: year,
      cover_url: cover_url,
    });
    return res.status(200).json({ album: "created", newAlbum });
    /*    } */
  },
  deleteAlbum: async (req, res) => {
    const id = req.params.id;
    const album = await Album.findOne({
      where: { id: id },
    });
    if (album) {
      console.log("album found");
      await Album.destroy({ where: { id: id } });
      return res.status(200).json({ success: "album deleted " + id });
    } else {
      return res.status(400).json({ error: "album not found with this " + id });
    }
  },
};
module.exports = albumController;
