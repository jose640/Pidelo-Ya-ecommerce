const server = require("express").Router();
const { Image } = require("../db.js");
const storage = require("../multer.js");
const multer = require("multer");

const uploader = multer({ storage });

server.get("/", (req, res) => {
  Image.findAll().then((imagenes) => {
    res.json(imagenes);
  });
});

server.post("/", uploader.single("file"), async (req, res) => {
  const { file, body } = req;

  if (file && body) {
    const newImage = new Image({
      fileName: body.name,
      urlFile: `http://localhost:3001/${file.filename}`,
    });
    await newImage.save(res.json({ newImage: newImage }));
  }
});

module.exports = server;
