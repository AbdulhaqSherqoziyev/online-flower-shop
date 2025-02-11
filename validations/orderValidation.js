const Joi = require('joi');

const createOrderSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
});


module.exports = { createOrderSchema };