import express from "express";
import Cart from "../models/Cart.js";
import { auth } from "../middleware/auth.js";
import Product from "../models/Product.js";

const router = express.Router();

// Get user cart
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product");

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: []
      });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add item to cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create user's cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: []
      });
    }

    // Check if product is already in cart
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity if product exists
      cart.cartItems[itemIndex].quantity = quantity;
    } else {
      // Add new item
      cart.cartItems.push({
        product: productId,
        name: product.name,
        image: product.imageUrl,
        price: product.price,
        quantity
      });
    }

    await cart.save();
    await cart.populate("cartItems.product");

    res.status(201).json(cart);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update cart item quantity
router.put("/:itemId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.itemId;

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update quantity
    cart.cartItems[itemIndex].quantity = quantity;

    await cart.save();
    await cart.populate("cartItems.product");

    res.json(cart);
  } catch (error) {
    console.error("Update cart item error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Remove item from cart
router.delete("/:itemId", auth, async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item from cart
    cart.cartItems = cart.cartItems.filter(
      (item) => item._id.toString() !== itemId
    );

    await cart.save();
    await cart.populate("cartItems.product");

    res.json(cart);
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Clear cart
router.delete("/", auth, async (req, res) => {
  try {
    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear cart items
    cart.cartItems = [];

    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router; 