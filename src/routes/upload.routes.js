const { connection } = require("../db_connection");
const router = require("express").Router();
const fileUpload = require("express-fileupload");
const front = `${__dirname}/../../client/build/uploads`;
const fs = require("fs");
router.use(fileUpload());

router.post("/bg", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const extension = file.name.split(".").pop();
  file.name = "bg." + extension;

  fs.unlink(front, (err) => {
    if (err) {
      console.log("pas ok");
    } else {
      console.log("ok");
    }
  });
  file.mv(`${front}/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: `/uploads/${file.name}`,
      filePath: `/uploads/${file.name}`,
    });
  });
});

module.exports = router;
