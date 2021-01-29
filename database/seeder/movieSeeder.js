const Movie = require("../../models/Movie");
const Genre = require("../../models/Genre");

async function createMovie(genreId, data) {
  try {
    const genre = await Genre.findById(genreId).select("name");
    const movie = await Movie.create({ ...data, genre });
    return { data: movie };
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = { createMovie };
