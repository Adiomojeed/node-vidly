const Joi = require("joi");

const validator = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
    genreId: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = validator;
