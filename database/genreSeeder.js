require("dotenv/config");
const mongoose = require("mongoose");
const debug = require("debug")("app:db");

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => debug("Connected to database..."))
  .catch(() => debug("Could not connect to the database"));

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4 },
  downloads: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Genre = mongoose.model("Genre", genreSchema);

async function getGenres() {
  return (result = await Genre.find());
}

async function createGenre(data) {
  const { name, downloads } = data;
  const genre = new Genre({
    name,
    downloads,
  });
  try {
    return (result = await genre.save());
  } catch (err) {
    return err.message;
  }
}

async function getGenre(id) {
  try {
    const result = await Genre.findById(id);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function updateGenre(id, data) {
  try {
    const { name, downloads } = data;
    const genre = await Genre.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          downloads,
        },
        $currentDate: {
          updatedAt: 1,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return { data: genre, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

async function deleteGenre(id) {
  try {
    const genre = await Genre.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    return { data: genre, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

module.exports = { getGenres, createGenre, getGenre, updateGenre, deleteGenre };
