const mongoose = require("mongoose");
const conn = require("../db/conn");

const Userinfo = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  joined: { type: Date, default: Date.now },
  Token: { type: String, required: true },
});

const users = new mongoose.model("Userinfo", Userinfo);
module.exports = users;
