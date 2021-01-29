const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
  numberInStock: { type: Number, required: true, min: 0 },
  dailyRentalRate: { type: Number, required: true, min: 0 },
  genre: { type: Object, required: true },
});

module.exports = mongoose.model("Movie", movieSchema);
