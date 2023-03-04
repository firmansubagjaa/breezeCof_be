const express = require("express");
const router = express();

//import route
const productRoute = require("../routes/productRoute");
const authRoute = require("../routes/authRoute");

router.get("/", (req, res) => {
  return res.send("backend for coffeeshop");
});

// router.get("/:id", (req, res) => {

// });
router.use("/products", productRoute);
router.use("/auth", authRoute);

module.exports = router;
