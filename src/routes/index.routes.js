const router = require("express").Router();
const users = require("./users.routes.js");
const currentsongs = require("./currentsongs.routes.js");
const events = require("./events.routes.js");
const login = require("./login.routes.js");
const upload = require("./upload.routes.js");

router.use("/login", login);
router.use("/users", users);
router.use("/currentsongs", currentsongs);
router.use("/events", events);
router.use("/upload", upload);

module.exports = router;
