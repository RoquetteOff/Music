const router = require("express").Router();
const users = require("./users.routes.js");
const currentsongs = require("./currentsongs.routes.js");
const app = require("./app.routes.js");
const login = require("./login.routes.js");

router.use("/login", login);
router.use("/users", users);
router.use("/currentsongs", currentsongs);
router.use("/app", app);


module.exports = router;
