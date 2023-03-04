/* eslint-disable no-undef */
const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("../models/authModel");
// const db = require("../../helper/connection");
// const { v4: uuidv4 } = require("uuid");
const { JWT_PRIVATE_KEY } = process.env;

//GET
const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        //mendapatkan token dengan jsonwebtoken
        jwt.sign({ id: result.id, role: result.role }, JWT_PRIVATE_KEY, { expiresIn: "1d" }, (err, token) => {
          return res.status(200).send({
            message: "success",
            data: {
              token,
              user: {
                id: result.id,
                fullname: result.fullname,
                img: result.img,
                role: result.role,
                username: result.username,
              },
            },
          });
        });
      })
      .catch((error) => {
        return res.status(400).send({ message: error.message });
      });
  },

  //POST
  register: (req, res) => {
    // menambahkan error handling
    if (req.body.username == "" && req.body.password == "") return res.status(500).send({ message: "tidak ada data diri" });
    if (req.body.username == "") return res.status(500).send({ message: "username harus dimasukkan" });
    if (req.body.password == "") return res.status(500).send({ message: "password harus dimasukkan" });
    // db.query(`INSERT INTO users (username) VALUES($1)`, [username], (err, result) => {
    //   if (req.body.username === result) return res.status(500).send({ message: "username sudah tersedia" });
    // });
    // menambahkan enkripsi
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          username: req.body.username,
          password: hash,
        };
        return authModel
          .register(request)
          .then(() => {
            return res.status(201).send({ message: "success", data: "ADD_SUCCESS" });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
  },
};

module.exports = authController;
