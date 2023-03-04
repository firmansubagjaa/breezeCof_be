/* eslint-disable no-undef */
const { Client } = require("pg");
require("dotenv").config();

const { DB_USER } = process.env;
const { DB_HOST } = process.env;
const { DB } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_PORT } = process.env;

const db = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB,
  password: DB_PASSWORD,
  port: DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.log("db, connection error", err);
  }

  // optional
  // if (!err) {
  //   console.log("database berhasil tersambung");
  // } else {
  //   console.log("db error connection", err);
  // }
});

module.exports = db;
