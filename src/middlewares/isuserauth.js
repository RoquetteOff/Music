require('dotenv').config();
const jwt = require("jsonwebtoken");


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("you need token");
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({auth: false, message: "you are not auth"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

module.exports = {
    verifyJWT: verifyJWT
};
