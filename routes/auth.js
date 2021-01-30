const express = require("express");
const router = express.Router();
const validator = require("../validations/authValidator");
const authSeeder = require("../database/seeder/authSeeder");

router.post("/", async (req, res) => {
  const { error, value } = validator(req.body);
  error && res.status(400).send(error.details);
  const user = await authSeeder.loginUser(value);
  user.error && res.status(400).send(user.error);
  res.header("x-auth-token", user.token).send(user.data);
});

module.exports = router;
