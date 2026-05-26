const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  emoji: String,
  image: String,
  images: [String],
  imageBW: String,
  imageColor: String,
  variants: {
    colors: [String],
    sizes: [String]
  },
  isHotSelling: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isRecommended: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
