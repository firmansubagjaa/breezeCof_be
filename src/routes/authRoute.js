const express = require("express");
const router = express();

//import controller
const authController = require("../controllers/authController");

// endpoint
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
