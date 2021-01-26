const express = require("express");
const router = express.Router();
const customerSeeder = require("../database/seeder/customerSeeder");
const validator = require("../validations/customerValidator");

router.get("/", async (req, res) => {
  const result = await customerSeeder.getCustomers();
  if (result.error) res.status(400).send(result.error);
  res.send(result.data);
});

router.post("/", async (req, res) => {
  const { error, value } = validator(req.body);
  if (error) res.status(400).send(error.details);
  const result = await customerSeeder.createCustomer(value);
  if (result.error) res.status(400).send(result.error);
  res.send(result.data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await customerSeeder.getCustomer(id);
  if (result.error || !result.data)
    return res.status(404).send(result.error || "Customer not found");
  res.send(result.data);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, value } = validator(req.body);
  error && res.status(400).send(error.details);
  const result = await customerSeeder.updateCustomer(id, value);
  result.error && res.status(400).send(result.error);
  res.send(result.data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await customerSeeder.deleteCustomer(id);
  if (result.error || !result.data)
    return res.status(404).send(result.error || "Customer not found");
  res.send(result.data);
});

module.exports = router;
