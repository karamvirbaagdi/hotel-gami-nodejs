const mongoose = require("mongoose");
const conn = require("../db/conn");

const categoryData = new mongoose.Schema({
    Name: { type: String, required: true },
    Slug: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
   
});

const Category = new mongoose.model("categoryData", categoryData);
module.exports = Category;

