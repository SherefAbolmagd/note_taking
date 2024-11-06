const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../class/logger"); // Import the logger
require("dotenv").config();

// User registration
async function newUser(req, res) {
  try {
    const { username, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      username,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    logger.log(error);
    const logs = logger.getLogs();
    console.log(logs); // Print the logs
    res.status(500).json({ error: "Internal server error" });
  }
}

// User login
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await db.User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    logger.log(error);
    const logs = logger.getLogs();
    console.log(logs); // Print the logs
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { login, newUser };
