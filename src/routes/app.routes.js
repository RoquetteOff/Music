const appcommonJSON = require("../json/appcommon.json");

const router = require("express").Router();
const { verifyJWT } = require("../middlewares/isuserauth");

router.get("/songinprogress", (req, res) => {
  res.status(200).json(appcommonJSON[0]);
});

router.put("/songinprogress/:id", verifyJWT, (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.body.titleincurent);
  appcommonJSON[id].app.titleincurent = req.body.titleincurent;
  res.status(200).json(appcommonJSON[id]);
});

module.exports = router;
