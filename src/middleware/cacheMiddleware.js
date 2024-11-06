const { createClient } = require("redis");
const client = createClient();

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

function cacheNotes(req, res, next) {
  const userId = req.user.id; // Assuming you have user authentication middleware
  const cacheKey = `notes:${userId}`;

  // Check if the data exists in the cache
  client.get(cacheKey, (err, cachedData) => {
    if (err) {
      console.error("Redis error:", err);
      return next(); // Proceed without caching if Redis encounters an error
    }

    if (cachedData) {
      // If data exists in the cache, return it
      res.status(200).json(JSON.parse(cachedData));
    } else {
      // If data is not in the cache, proceed to fetch it from the database
      next();
    }
  });
}

module.exports = { cacheNotes, client };
