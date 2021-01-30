const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

async function createUser(data) {
  try {
    const { name, email, password } = data;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    let user = await User.findOne({ email });
    if (user) {
      return { data: null, error: "User already existed..." };
    }
    user = await User.create({ name, email, password: hashed });
    const token = user.generateAuthToken();
    return { data: _.pick(user, ["_id", "name", "email"]), error: null, token };
  } catch (e) {
    return { data: null, error: e.message };
  }
}

module.exports = { createUser };
