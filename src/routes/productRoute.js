const express = require("express");
const router = express();

//import controller
const productController = require("../controllers/productController");

// endpoint
router.get("/", productController.get);
router.get("/:id", productController.getDetail);
router.post("/", productController.add);
// router.put("/", productController.update);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

module.exports = router;

// router.get("/", (req, res) => {
//routes/viev
//   db.query(`SELECT * from products`, (err, result) => {
//     //model = berkaitan dengan chema,database,query
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       return res.status(200).send({ message: "success", data: result.rows });
//     }
//   });
// });

// router.get("/products/:id", (req, res) => {
//   const { id } = req.params;
//   db.query(`SELECT * from products WHERE id = '${id}'`, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       return res.status(200).send({ message: "success", data: result.rows[0] });
//     }
//   });
// });

// router.post("/products", (req, res) => {
//   const { title, img, price, category } = req.body;
//   db.query(`INSERT INTO products (id, title, img, price, category) VALUES ('${uuidv4()}', '${title}', '${img}', '${price}', '${category}')`, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       return res.status(201).send({ message: "success", data: req.body });
//     }
//   });
// });

// router.put("/products/:id", (req, res) => {
// const { title, img, price, category } = req.body;
// const { id } = req.params;
// db.query(`UPDATE products SET title = '${title}', img = '${img}', price = '${price}', category = '${category}' WHERE id = '${id}'`, (err, result) => {
//   if (err) {
//     return res.status(500).send({ message: err.message });
//   } else {
//     return res.status(201).send({ message: `success to update data ${id}`, data: res.body });
//   }
// });
// });

// router.patch("/products/:id", (req, res) => {
//   const { title, img, price, category } = req.body;
//   const { id } = req.params;
//   db.query(`SELECT * FROM products WHERE id = '${id}'`, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       // const dataUpdate = [result.rows[0].title, result.rows[0].img, result.rows[0].price, result.rows[0].category];
//       db.query(
//         `UPDATE products SET title = '${title || result.rows[0].title}', img = '${img || result.rows[0].img}', price = '${price || result.rows[0].price}', category = '${category || result.rows[0].category}' WHERE id = '${id}'`,
//         (err, result) => {
//           if (err) {
//             return res.status(500).send({ message: err.message });
//           } else {
//             return res.status(201).send({ message: `success to update data ${id}`, data: res.body });
//           }
//         }
//       );
//     }
//   });
// });

// router.delete("/products/:id", (req, res) => {
//   const { id } = req.params;
//   db.query(`DELETE from products WHERE id = '${id}'`, (err, result) => {
//     if (err) {
//       return res.status(500).send({ message: err.message });
//     } else {
//       return res.status(201).send({ message: `success to delete data ${id}`, data: {} });
//     }
//   });
// });
