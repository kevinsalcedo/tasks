const jwt = require("jsonwebtoken");
const config = require("config");

// FUuction that has access to request and response objects
// Next - callback to run after
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    // Unauthorized
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    // TOken is not valid
    res.status(401).json({ msg: "Token is invalid" });
  }
};
