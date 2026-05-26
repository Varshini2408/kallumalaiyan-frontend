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

router.post("/", upload.fields([
  { name: "imageBW", maxCount: 5 },
  { name: "imageColor", maxCount: 5 }
]), async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price) || 60,
      description: req.body.description,
      isHotSelling:  req.body.isHotSelling  === "true",
      isNewArrival:  req.body.isNewArrival  === "true",
      isRecommended: req.body.isRecommended === "true",
      variants: {
        colors: ["Black and White", "Color"],
        sizes: ["A4", "A3"]
      }
    };

    if (req.files) {
      if (req.files.imageBW && req.files.imageBW.length > 0) {
        const urls = await Promise.all(
          req.files.imageBW.map(f => uploadToCloudinary(f.buffer, f.originalname))
        );
        productData.imagesBW = urls.map(r => r.secure_url);
        productData.imageBW = productData.imagesBW[0];
        productData.image = productData.imageBW;
      }
      if (req.files.imageColor && req.files.imageColor.length > 0) {
        const urls = await Promise.all(
          req.files.imageColor.map(f => uploadToCloudinary(f.buffer, f.originalname))
        );
        productData.imagesColor = urls.map(r => r.secure_url);
        productData.imageColor = productData.imagesColor[0];
      }
    }

    const product = await Product.create(productData);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.fields([
  { name: "imageBW", maxCount: 5 },
  { name: "imageColor", maxCount: 5 }
]), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price) || 60,
      description: req.body.description,
      isHotSelling:  req.body.isHotSelling  === "true",
      isNewArrival:  req.body.isNewArrival  === "true",
      isRecommended: req.body.isRecommended === "true",
    };

    if (req.files) {
      if (req.files.imageBW && req.files.imageBW.length > 0) {
        const urls = await Promise.all(
          req.files.imageBW.map(f => uploadToCloudinary(f.buffer, f.originalname))
        );
        updateData.imagesBW = urls.map(r => r.secure_url);
        updateData.imageBW = updateData.imagesBW[0];
        updateData.image = updateData.imageBW;
      }
      if (req.files.imageColor && req.files.imageColor.length > 0) {
        const urls = await Promise.all(
          req.files.imageColor.map(f => uploadToCloudinary(f.buffer, f.originalname))
        );
        updateData.imagesColor = urls.map(r => r.secure_url);
        updateData.imageColor = updateData.imagesColor[0];
      }
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
