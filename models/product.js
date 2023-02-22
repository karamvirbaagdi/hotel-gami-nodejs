const { string, optional, number } = require("joi");
const mongoose = require("mongoose");
const conn = require("../db/conn");

const productData = new mongoose.Schema({
  Title: { type: String, required: true },
  Slug: { type: String, required: true },
  Description: { type: String },
  Sku: { type: Number, required: true },
  Categories: { type: mongoose.Types.ObjectId, ref: "categoryData" },
  Tags: { type: mongoose.Types.ObjectId, ref: "Taginfo" },
  Image: { type: String },
  Price: { type: Number },
  CreatedAt: { type: Date, default: Date.now },
  UpdateAt: { type: Date, default: Date.now },
});

const prductData = new mongoose.model("productData", productData);
module.exports = prductData;
