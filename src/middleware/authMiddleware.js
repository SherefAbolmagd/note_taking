const jwt = require("jsonwebtoken");
require('dotenv').config();

// Middleware for user authentication
function authenticateUser(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    req.user = decodedToken;
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticateUser;
