const express = require("express");
const router = express.Router();
const validator = require("../validations/rentalValidator");
const Rental = require("../database/seeder/rentalSeeder");

router.get("/", async (req, res) => {
  const rentals = await Rental.getRentals();
  rentals.error && res.status(404).send(rentals.error);
  res.send(rentals.data);
});

router.post("/", async (req, res) => {
  const { error, value } = validator(req.body);
  error && res.status(400).send(error.details);
  const rental = await Rental.createRental(value);
  rental.error && res.status(400).send(rental.error);
  res.send(rental.data);
});

module.exports = router;
