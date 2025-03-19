import express from "express";
import CategoryImage from "../models/CategoryImage.js";

const router = express.Router();

// GET all category images
router.get("/", async (req, res) => {
  try {
    const images = await CategoryImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single category image by category
router.get("/:category", async (req, res) => {
  try {
    const categoryImage = await CategoryImage.findOne({ 
      category: req.params.category 
    });
    
    if (!categoryImage) {
      return res.status(404).json({ message: "Category image not found" });
    }
    
    res.json(categoryImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new category image
router.post("/", async (req, res) => {
  const { category, title, description, imageUrl } = req.body;
  
  try {
    // Check if this category already exists
    const existingImage = await CategoryImage.findOne({ category });
    
    if (existingImage) {
      return res.status(400).json({ 
        message: `Image for category ${category} already exists. Use PUT to update.` 
      });
    }
    
    const categoryImage = new CategoryImage({
      category,
      title,
      description,
      imageUrl
    });
    
    const savedImage = await categoryImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a category image
router.put("/:category", async (req, res) => {
  try {
    const updatedImage = await CategoryImage.findOneAndUpdate(
      { category: req.params.category },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedImage) {
      return res.status(404).json({ message: "Category image not found" });
    }
    
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a category image
router.delete("/:category", async (req, res) => {
  try {
    const result = await CategoryImage.findOneAndDelete({ 
      category: req.params.category 
    });
    
    if (!result) {
      return res.status(404).json({ message: "Category image not found" });
    }
    
    res.json({ message: "Category image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Initialize default category images if none exist
router.post("/initialize", async (req, res) => {
  try {
    const count = await CategoryImage.countDocuments();
    
    if (count > 0) {
      return res.status(400).json({ 
        message: "Category images already exist. Cannot initialize again." 
      });
    }
    
    const defaultImages = [
      {
        category: "Display Counters",
        title: "Display Counters",
        description: "Showcase your products with our premium display counters",
        imageUrl: "https://images.unsplash.com/photo-1621335219895-fe4e4d52b061?q=80&w=2070"
      },
      {
        category: "Beverage Machines",
        title: "Beverage Machines",
        description: "Professional coffee machines and water coolers",
        imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071"
      },
      {
        category: "Refrigeration",
        title: "Refrigeration",
        description: "Deep freezers, visi coolers, and refrigeration solutions",
        imageUrl: "https://images.unsplash.com/photo-1584992236310-6ded2e0754b7?q=80&w=2067"
      },
      {
        category: "Cooking Equipment",
        title: "Cooking Equipment",
        description: "Commercial cooking ranges, food warmers, and hot cases",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070"
      }
    ];
    
    await CategoryImage.insertMany(defaultImages);
    res.status(201).json({ message: "Default category images initialized successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 