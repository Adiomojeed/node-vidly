const Genre = require("../../models/Genre");

async function getGenres() {
  return (result = await Genre.find());
}

async function createGenre(data) {
  const { name, downloads } = data;
  try {
    return (result = await Genre.create({
      name,
      downloads,
    }));
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
