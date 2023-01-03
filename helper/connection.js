const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "coffeeshop",
  password: "@Avenged123",
  port: 5432,
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
