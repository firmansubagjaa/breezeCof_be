// mendeklarasikan
// mendeklarasikan bodyparse, dan json
const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const port = 3000;
//menghubungkan connection.js
const db = require("./helper/connection");
const { v4: uuidv4 } = require("uuid");

//defaultnya express js itu ga menerima semua jenis form
// use() = middleware => urlencoded, json
//menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
//menerima json
app.use(json());

//endpoint
app.get("/products", (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * from products`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(200).send({ message: "success", data: result.rows });
    }
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * from products WHERE id = '${id}'`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(200).send({ message: "success", data: result.rows[0] });
    }
  });
});

app.post("/products", (req, res) => {
  const { title, img, price, category } = req.body;
  db.query(`INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}', '${title}', '${img}', '${price}', '${category}')`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(201).send({ message: "success", data: req.body });
    }
  });
});

app.put("/products/:id", (req, res) => {
  const { title, img, price, category } = req.body;
  const { id } = req.params;
  db.query(`UPDATE products SET title = '${title}', img = '${img}', price = '${price}', category = '${category}' WHERE id = '${id}'`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(201).send({ message: `success to update data ${id}`, data: res.body });
    }
  });
});

app.patch("/products/:id", (req, res) => {
  const { title, img, price, category } = req.body;
  const { id } = req.params;
  db.query(`SELECT * FROM products WHERE id = '${id}'`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category];
      db.query(
        `UPDATE products SET title = '${title || result.rows[0].title}', img = '${img || result.rows[0].img}', price = '${price || result.rows[0].price}', category = '${category || result.rows[0].category}' WHERE id = '${id}'`,
        (err, result) => {
          if (err) {
            return res.status(500).send({ message: err.message });
          } else {
            return res.status(201).send({ message: `success to update data ${id}`, data: res.body });
          }
        }
      );
    }
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query(`DELETE from products WHERE id = '${id}'`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(201).send({ message: `success to delete data ${id}`, data: {} });
    }
  });
});

app.get("*", (req, res) => {
  return res.json({
    status: 404,
    message: "Not ada",
  });
});

// app.use("/*", (req, res) => {
//   res.status(404).send("Sorry can't find that!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
