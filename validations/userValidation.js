const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
});

// Update user password
const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
});

// Update user status
const updateStatusSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive'),
});

// Update user address
const updateAddressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  zipCode: Joi.string(),
});


module.exports = { 
  updateUserSchema,
  updatePasswordSchema, // will be update
  updateStatusSchema,   // will be update
  updateAddressSchema   // will be update
};