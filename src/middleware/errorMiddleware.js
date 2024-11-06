// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);

  // Handle specific errors (add more as needed)
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ error: "Validation error", details: err.errors });
  }

  // Handle other errors
  res.status(500).json({ error: "Internal server error" });
}

module.exports = errorHandler;
