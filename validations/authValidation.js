const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const verifyOTPSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
});

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyOTPSchema,
  resetPasswordSchema,    // will be update
  changePasswordSchema,   // will be update
  forgotPasswordSchema,   // will be update
  updateProfileSchema,    // will be update
  updatePasswordSchema,   // will be update
};

