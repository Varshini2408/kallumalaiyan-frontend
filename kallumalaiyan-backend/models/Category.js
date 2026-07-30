const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, default: null },
  description: { type: String, default: "" }
}, { timestamps: true })

module.exports = mongoose.model("Category", CategorySchema)