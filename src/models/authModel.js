/* eslint-disable no-undef */
const db = require("../../helper/connection");
// const username = require("../controllers/authController");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

const authModel = {
  //LOGIN
  login: ({ username, password }) => {
    console.log(username, password);
    return new Promise((resolve, reject) => {
      // letak error handling
      if (username == "" && password == "") return reject({ message: "masukkan akun anda" });
      db.query("SELECT * FROM users WHERE username=$1", [username], (err, result) => {
        if (err)
          //pengecekan username
          return reject(err.message);
        if (result.rows.length == 0) return reject({ message: "username salah." }); //ketika username salah
        //pengecekan password
        bcrypt.compare(password, result.rows[0].password, (err, hasingResult) => {
          if (err) return reject(err.message); // ketika hashing bermasalah
          // return resolve(result.rows[0]);

          if (!hasingResult) return reject({ message: "password salah." }); //ketika password salah
          return resolve(result.rows[0]);
        });
      });
    });
  },

  //REGISTER
  register: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      // query membuat username dan password
      // if (username == "" && password == "") return reject({ message: "tidak ada data diri" });
      // if (username == "") return reject("username harus dimasukkan");
      db.query(`INSERT INTO users (id, username, password) VALUES($1, $2, $3)`, [uuidv4(), username, password], (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result);
        }
      });
    });
  },
};

module.exports = authModel;
