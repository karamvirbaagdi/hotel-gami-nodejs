const mongoose = require("mongoose");
const conn = require("../db/conn");

const Taginfo = new mongoose.Schema({
    Name: { type: String, required: true },
    Slug: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
   
});

const tags = new mongoose.model("Taginfo", Taginfo);
module.exports = tags;

