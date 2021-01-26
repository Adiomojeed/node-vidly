const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5 },
  phone: { type: String, required: true, minlength: 11, match: /^[0-9]/ },
  isGold: { type: Boolean, required: true },
});

module.exports = mongoose.model("Customer", customerSchema);
