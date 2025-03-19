import mongoose from "mongoose";

const categoryImageSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      required: true,
      unique: true,
      enum: ['Display Counters', 'Beverage Machines', 'Refrigeration', 'Cooking Equipment']
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const CategoryImage = mongoose.model("CategoryImage", categoryImageSchema);
export default CategoryImage; 