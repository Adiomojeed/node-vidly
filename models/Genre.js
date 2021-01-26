const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4 },
  downloads: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Genre", genreSchema);
