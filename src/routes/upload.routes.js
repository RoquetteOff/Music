const { connection } = require("../db_connection");
const router = require("express").Router();
const fileUpload = require("express-fileupload");
const front = `${__dirname}/../../client/build/uploads`;
const fs = require("fs");
const { verifyJWT } = require("../middlewares/isuserauth");
router.use(fileUpload());

router.post("/bg/:id", verifyJWT, (req, res) => {
  let event = null;
  const file = req.files.file;
  console.log(file);
  const extension = file.name.split(".").pop();
  file.name = "bg-music." + extension;
  console.log(file.name);

  // On verifie si la requetes contien bien un fichier
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // on va chercher l'events à modifier
  const sqlEvents = "SELECT * FROM events WHERE id=?";
  connection.query(sqlEvents, req.params.id, async (err, results) => {
    if (err) {
      return res.status(500).send({ errorMessage: err.message });
    } else {
      event = results[0];

      if (event.bg_music !== null) {
        // si un bg est deja assigné on supprime le ficheier existant
        fs.unlink(`${front}/${event.bg_music}`, (err) => {
          if (err) {
            return res.status(500).send({ errorMessage: err.message });
          } else {
            file.mv(`${front}/${file.name}`, (err) => {
              if (err) {
                return res.status(500).send(err);
              }
              res
                .json({
                  fileName: `/uploads/${file.name}`,
                  filePath: `/uploads/${file.name}`,
                })
                .status(200);
            });
          }
        });
      } else {
        // si pas de BG assigné
        file.mv(`${front}/${file.name}`, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          res
            .json({
              fileName: `/uploads/${file.name}`,
              filePath: `/uploads/${file.name}`,
            })
            .status(200);
        });
      }
    }
  });
});

module.exports = router;