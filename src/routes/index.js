const express = require("express");
const router = express();

//home
const productRoute = require("../routes/productRoute");
router.get("/", (req, res) => {
  return res.send("backend for coffeeshop");
});
router.use("/products", productRoute);

module.exports = router;
