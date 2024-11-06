const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const noteRoutes = require("./note");

router.use("/users", userRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
