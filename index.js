// mendeklarasikan
// mendeklarasikan bodyparse, dan json
const { urlencoded, json } = require("express");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();

//menghubungkan connection.js
// const db = require("./helper/connection");
const router = require("./src/routes/index");
app.use(cors());
// const { v4: uuidv4 } = require("uuid");
app.use(urlencoded({ extended: true }));
//menerima json
app.use(json());
//menerima cors
//menerima router
app.use(express.static("public"));

app.use("/api/v1", router);
app.get("*", (req, res) => {
  return res.json({
    status: 404,
    message: "Not ada",
  });
});

app.listen(port, () => {
  console.log(`Testing microservice on port ${port}`);
});
