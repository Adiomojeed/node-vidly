const mongoose = require("mongoose");
const Rental = require("../../models/Rental");
const Movie = require("../../models/Movie");
const Customer = require("../../models/Customer");

async function createRental(data) {
  try {
    const { movieId, customerId, ...rest } = data;
    const movie = await Movie.findById(movieId);
    if (movie.numberInStock > 0) {
      const customer = await Customer.findById(customerId);
      const rental = await Rental.create({
        movie: {
          _id: movie.id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
        customer,
        dateReturned: rest.dateReturned,
        rentalFee: rest.rentalFee,
      });
      await Movie.findByIdAndUpdate(
        movieId,
        {
          $inc: {
            numberInStock: -1,
          },
        },
        { useFindAndModify: false }
      );
      return { data: rental, error: null };
    } else {
      return { data: null, error: "Movie not in stock at the moment" };
    }
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function getRentals() {
  try {
    const rentals = await Rental.find().sort("-dateOut");
    return { data: rentals, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

module.exports = { createRental, getRentals };
