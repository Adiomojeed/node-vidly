const express = require("express");
const router = express.Router();
const genreSeeder = require("../database/seeder/genreSeeder");
const validator = require("../validations/genreValidator");

// Getting all genres
router.get("/", async (req, res) => {
  const result = await genreSeeder.getGenres();
  res.send(result);
});

// Creating a new genre
router.post("/", async (req, res) => {
  const { error, value } = validator(req.body);
  if (error) return res.status(400).send(error.details);
  const genre = await genreSeeder.createGenre(value);
  res.send(genre);
});

// Getting a single genre
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await genreSeeder.getGenre(id);
  if (result.error) return res.status(404).send(result.error);
  res.send(result.data);
});

// Updating a genre
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { error, value } = validator(req.body);
  const result = await genreSeeder.updateGenre(id, value);
  if (error) return res.status(400).send(error.details);
  if (result.error) return res.status(404).send(result.error);
  res.send(result.data);
});

// Deleting a genre
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await genreSeeder.deleteGenre(id);
  if (result.error || !result.data)
    return res.status(404).send(result.error || "Genre not found");
  res.send(result.data);
});

module.exports = router;
