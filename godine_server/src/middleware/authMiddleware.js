const jwt = require("jsonwebtoken");
const User = require("../models/users");

const checkAuth = async (req, res, next) => {
  try {
    // Check if the authorization header exists
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1]; // Assumes Bearer token
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    // Check if the token has expired
    const now = new Date().getTime() / 1000; // Current time in seconds
    if (decoded.exp < now) {
      return res.status(401).json({ message: "Token has expired" });
    }

    // Check if the user still exists and has not been deleted
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "The user belonging to this token no longer exists" });
    }

    // Check if the user has the required role
    if (!["user", "restaurant owner"].includes(user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }

    // If everything checks out, add the user to the request object and pass control to the next middleware
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = checkAuth;
