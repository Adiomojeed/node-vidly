const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  movie: { type: Object, required: true },
  customer: { type: Object, required: true },
  dateOut: { type: Date, default: Date.now(), required: true },
  dateReturned: { type: Date },
  rentalFee: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("Rental", rentalSchema);
