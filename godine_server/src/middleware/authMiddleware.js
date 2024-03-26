const jwt = require("jsonwebtoken");
exports.checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

exports.isRestaurantOwner = async (req, res, next) => {
  if (req.user && req.user.isRestaurantOwner) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as a restaurant owner" });
  }
};

exports.isUser = async (req, res, next) => {
  if (req.user) {
    // Assuming any authenticated user is considered as 'User'
    next();
  } else {
    res.status(403).json({ message: "Not authorized as a user" });
  }
};
