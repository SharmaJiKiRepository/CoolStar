import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

// GET all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET featured testimonials
router.get("/featured", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ featured: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single testimonial by ID
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new testimonial
router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonial({
      name: req.body.name,
      company: req.body.company,
      content: req.body.content,
      rating: req.body.rating || 5,
      avatar: req.body.avatar || null,
      featured: req.body.featured || false
    });
    
    const savedTestimonial = await testimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a testimonial
router.put("/:id", async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH: Toggle featured status
router.patch("/:id/toggle-featured", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    
    testimonial.featured = !testimonial.featured;
    const updated = await testimonial.save();
    
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a testimonial
router.delete("/:id", async (req, res) => {
  try {
    const result = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Initialize default testimonials if none exist
router.post("/initialize", async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    
    if (count > 0) {
      return res.status(400).json({ 
        message: "Testimonials already exist. Cannot initialize again." 
      });
    }
    
    const defaultTestimonials = [
      {
        name: "John Smith",
        company: "Smith's Cafe",
        content: "The coffee machines from CoolStar have transformed our cafe. Excellent quality and service!",
        rating: 5,
        featured: true
      },
      {
        name: "Sarah Johnson",
        company: "Frosty Delights",
        content: "We've been using their freezers for years. Reliable and energy-efficient. Highly recommended!",
        rating: 5,
        featured: true
      },
      {
        name: "Robert Chen",
        company: "Premium Bakery",
        content: "The display counters are elegant and functional. Our pastries look even more tempting now!",
        rating: 4,
        featured: false
      }
    ];
    
    await Testimonial.insertMany(defaultTestimonials);
    res.status(201).json({ message: "Default testimonials initialized successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 