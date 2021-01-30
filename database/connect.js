require("dotenv/config");
const mongoose = require("mongoose");
const debug = require("debug")("app:db");

const connect = (dbUrl) =>
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => debug("Connected to database..."))
    .catch(() => debug("Could not connect to the database"));

module.exports = connect;
