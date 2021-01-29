const Joi = require("joi");

const validator = (data) => {
  const schema = Joi.object({
    movieId: Joi.string().required(),
    customerId: Joi.string().required(),
    dateReturned: Joi.date(),
    rentalFee: Joi.number().min(0).required(),
  });
  return schema.validate(data);
};

module.exports = validator;
