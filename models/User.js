const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(_.pick(this, ["_id", "name", "email"]), process.env.JWT_KEY);
};

module.exports = mongoose.model("User", userSchema);
