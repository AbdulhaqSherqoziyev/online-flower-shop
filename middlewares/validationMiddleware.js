const { registerSchema, loginSchema, verifyOTPSchema } = require('../validations/authValidation');
const { updateUserSchema } = require('../validations/userValidation');
const { createProductSchema, updateProductSchema } = require('../validations/productValidation');
const { createOrderSchema } = require('../validations/orderValidation');
const { createCommentSchema } = require('../validations/commentValidation');

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRegister: validateRequest(registerSchema),
  validateLogin: validateRequest(loginSchema),
  validateVerifyOTP: validateRequest(verifyOTPSchema),
  validateUpdateUser: validateRequest(updateUserSchema),
  validateCreateProduct: validateRequest(createProductSchema),
  validateUpdateProduct: validateRequest(updateProductSchema),
  validateCreateOrder: validateRequest(createOrderSchema),
  validateCreateComment: validateRequest(createCommentSchema),
};