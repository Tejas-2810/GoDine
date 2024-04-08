const jwt = require("jsonwebtoken");
const User = require("../models/users");

// authenticating using token cookie
const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
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
    if (!["user", "restaurant owner", "admin"].includes(user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }

    // todo: write conditions for paths based on roles

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if(error.message === "jwt expired"){
      return res.status(401).json({ message: "Token has expired" });
    }
    
    return res.status(500).json({ message: "Unable authenticate as processing the token failed" });
  }
};

module.exports = checkAuth;
