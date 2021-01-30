const express = require("express");
const router = express.Router();
const validator = require("../validations/userValidator");
const userSeeder = require("../database/seeder/userSeeder");

router.post("/", async (req, res) => {
  const { error, value } = validator(req.body);
  error && res.status(400).send(error.details);
  const user = await userSeeder.createUser(value);
  user.error && res.status(400).send(user.error);
  res.header("x-auth-token", user.token).send(user.data);
});

module.exports = router;
