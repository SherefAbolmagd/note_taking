const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
require("dotenv").config();

// User registration
router.post("/register", userController.newUser);

// User login
router.post("/login", userController.login);

module.exports = router;
