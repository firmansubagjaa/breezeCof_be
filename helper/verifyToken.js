/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!req.header("token")) {
    return res.status(400).send({
      message: "token is required",
    });
  } else {
    // console.log(req.header.authorization);
    jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
      if (!err) {
        if (decoded.role === "admin") {
          next();
        } else if (decoded.role === "user") {
          return res.status(403).send({
            message: "you not have a access",
          });
        } else {
          return res.status(403).send({
            message: "kamu tidak memiliki akses",
          });
        }
        // next();
        console.log(decoded);
      } else {
        res.status(400).send({
          message: "Token not valid.",
        });
      }
    });
  }
};

module.exports = verifyToken;
