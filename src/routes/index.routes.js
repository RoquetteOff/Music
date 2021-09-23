const router = require("express").Router();
const users = require("./users.routes.js");
const currentsongs = require("./currentsongs.routes.js");
const events = require("./events.routes.js");
const login = require("./login.routes.js");
const upload = require("./upload.routes.js");
const commonjson = require("./app.routes");

router.use("/login", login);
router.use("/users", users);
router.use("/currentsongs", currentsongs);
router.use("/events", events);
router.use("/upload", upload);
router.use("/app", commonjson);

module.exports = router;
