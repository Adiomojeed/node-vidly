const express = require("express");
const Joi = require("joi");
const router = express.Router();

const genres = [
  { id: 1, name: "Acapella", number: 23 },
  { id: 2, name: "High Life", number: 12 },
  { id: 3, name: "Apala", number: 15 },
];

//  Joi Validator
const validateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    number: Joi.number().required(),
  });
  return schema.validate(data);
};

// Getting all genres
router.get("/", (req, res) => {
  res.send(genres);
});

// Creating a new genre
router.post("/", (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details);
  const genre = { id: genres.length + 1, ...req.body };
  genres.push(genre);
  res.send(genre);
});

// Getting a single genre
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((i) => i.id === parseInt(id));
  if (!genre) return res.status(404).send("Genre not found");
  res.send(genre);
});

// Updating a genre
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;
  const genre = genres.find((i) => i.id === parseInt(id));
  if (!genre) return res.status(404).send("Genre not found");
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details);
  genre.name = name;
  genre.number = number || genre.number;
  res.send(genre);
});

// Deleting a genre
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const genre = genres.find((i) => i.id === parseInt(id));
  if (!genre) return res.status(404).send("Genre not found");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

module.exports = router;
