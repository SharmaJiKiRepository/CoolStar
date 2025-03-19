import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret");
    
    // Find user with matching id
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid token. User not found." });
    }
    
    // Add user to request object
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid token." });
  }
};

// Admin access middleware
const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin rights required." });
  }
  next();
};

export { auth, adminOnly }; 