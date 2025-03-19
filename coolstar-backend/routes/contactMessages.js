import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

// GET all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact message by ID
router.get("/:id", async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new contact message
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });
    
    const savedMessage = await contactMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Mark a message as read
router.put("/:id/read", async (req, res) => {
  try {
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a message
router.delete("/:id", async (req, res) => {
  try {
    const result = await ContactMessage.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 