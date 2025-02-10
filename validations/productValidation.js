const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  description: Joi.string(),
  imageUrl: Joi.string(),
  totalQuantity: Joi.number().integer().positive().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().positive(),
  description: Joi.string(),
  imageUrl: Joi.string(),
  totalQuantity: Joi.number().integer().positive(),
});

module.exports = { createProductSchema, updateProductSchema };