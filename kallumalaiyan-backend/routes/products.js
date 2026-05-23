const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { upload, uploadToCloudinary } = require("../services/upload");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price) || 60,
      description: req.body.description,
      isHotSelling:  req.body.isHotSelling  === "true" || req.body.isHotSelling  === true,
      isNewArrival:  req.body.isNewArrival  === "true" || req.body.isNewArrival  === true,
      isRecommended: req.body.isRecommended === "true" || req.body.isRecommended === true,
      variants: {
        colors: ["Black and White", "Color"],
        sizes: ["A4", "A3"]
      }
    };
    if (req.files && req.files.length > 0) {
      const uploadedUrls = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer, file.originalname))
      );
      productData.images = uploadedUrls.map(r => r.secure_url);
      productData.image = productData.images[0];
    }
    const product = await Product.create(productData);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price) || 60,
      description: req.body.description,
      isHotSelling:  req.body.isHotSelling  === "true" || req.body.isHotSelling  === true,
      isNewArrival:  req.body.isNewArrival  === "true" || req.body.isNewArrival  === true,
      isRecommended: req.body.isRecommended === "true" || req.body.isRecommended === true,
    };
    if (req.files && req.files.length > 0) {
      const uploadedUrls = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer, file.originalname))
      );
      updateData.images = uploadedUrls.map(r => r.secure_url);
      updateData.image = updateData.images[0];
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id, updateData, { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
