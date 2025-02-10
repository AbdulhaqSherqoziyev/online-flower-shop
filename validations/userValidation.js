const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
});

module.exports = { updateUserSchema };