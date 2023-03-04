const express = require("express");
const formUpload = require("../../helper/multer");
const verifyToken = require("../../helper/verifyToken");
const router = express();

//import controller
const productController = require("../controllers/productController");

// endpoint
router.get("/", productController.get);
router.get("/:id", productController.getDetail);
router.post("/", verifyToken, formUpload.array("img"), productController.add);
router.patch("/:id", verifyToken, formUpload.array("img"), productController.update);
router.delete("/:id", verifyToken, productController.remove);

module.exports = router;
