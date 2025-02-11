const Joi = require('joi');

const createCommentSchema = Joi.object({
  text: Joi.string().required(),
  status: Joi.string().valid('approved', 'pending', 'rejected').default('pending'),
});


// Update comment status to 'approved'
const approveCommentSchema = Joi.object({
  status: Joi.string().valid('approved'),
});


module.exports = { createCommentSchema };