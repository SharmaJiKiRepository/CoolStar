import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || "default_jwt_secret",
    { expiresIn: "7d" }
  );
};

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phoneNumber,
      address
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user data without password
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userData
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return user data without password
    const userData = user.toObject();
    delete userData.password;

    res.json({
      message: "Login successful",
      token,
      user: userData
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    // Return user data without password
    const userData = req.user.toObject();
    delete userData.password;

    res.json(userData);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, phoneNumber, address, currentPassword, newPassword } = req.body;
    const user = req.user;

    // Check if trying to update password
    if (currentPassword && newPassword) {
      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      
      user.password = newPassword;
    }

    // Update other fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;

    await user.save();

    // Return updated user data without password
    const userData = user.toObject();
    delete userData.password;

    res.json({
      message: "Profile updated successfully",
      user: userData
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all users (admin only)
router.get("/", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router; 