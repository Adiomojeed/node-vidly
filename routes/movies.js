const express = require("express");
const router = express.Router();
const validator = require("../validations/movieValidator");
const movieSeeder = require("../database/seeder/movieSeeder");

router.post("/", async (req, res) => {
  const { genreId } = req.body;
  const { error, value } = validator(req.body);
  error && res.status(400).send(error.details);
  const movie = await movieSeeder.createMovie(genreId, value);
  movie.error && res.status(404).send(movie.error);
  res.send(movie.data);
});

module.exports = router;
