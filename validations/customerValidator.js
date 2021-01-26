const Joi = require("joi");

const validator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    phone: Joi.string()
      .min(11)
      .regex(/^[0-9]/)
      .required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(data);
};

module.exports = validator;
