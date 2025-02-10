const Joi = require('joi');

const createCommentSchema = Joi.object({
  text: Joi.string().required(),
  status: Joi.string().valid('approved', 'pending', 'rejected').default('pending'),
});

module.exports = { createCommentSchema };