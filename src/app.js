const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./models/index"); // Initialize Sequelize
const routes = require("./routes");
const authenticateUser = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorMiddleware");
const { rateLimit } = require("express-rate-limit");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Use the authentication middleware for routes that require authentication
app.use("/api/notes", authenticateUser);

// Define routes
app.use("/api", routes);

// Error handling middleware should be the last in the chain
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
