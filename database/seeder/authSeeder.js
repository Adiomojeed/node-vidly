const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

async function loginUser(data) {
  try {
    const { email, password } = data;
    let user = await User.findOne({ email });
    if (!user) return { data: null, error: "Invalid email" };
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return { data: null, error: "Incorrect password" };
    const token = user.generateAuthToken();
    return {
      data: _.pick(user, ["_id", "name", "email"]),
      error: null,
      token,
    };
  } catch (e) {
    return { data: null, error: e.message };
  }
}

module.exports = { loginUser };
