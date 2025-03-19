import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    imageUrl: { type: String },
    additionalImages: [{ type: String }],
    category: { 
      type: String, 
      enum: ['Display', 'Beverage', 'Warming', 'Refrigeration', 'Cooking', 'IceCream', 'Other'],
      default: 'Other' 
    },
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    specifications: {
      dimensions: { type: String },
      weight: { type: String },
      powerConsumption: { type: String },
      capacity: { type: String },
      warranty: { type: String },
      material: { type: String }
    },
    variants: [{
      name: { type: String },
      price: { type: Number },
      imageUrl: { type: String }
    }],
    tags: [{ type: String }]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
