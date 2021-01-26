const Joi = require("joi");

const validator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    downloads: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = validator;
