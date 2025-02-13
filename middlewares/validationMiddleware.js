// Validatsiya sxemalarini tegishli fayllardan import qilish
const { registerSchema, loginSchema, verifyOTPSchema } = require('../validations/authValidation');
const { updateUserSchema } = require('../validations/userValidation');
const { createProductSchema, updateProductSchema } = require('../validations/productValidation');
const { createOrderSchema } = require('../validations/orderValidation');
const { createCommentSchema } = require('../validations/commentValidation');

/**
 * @description Request ma'lumotlarini tekshirish uchun umumiy validatsiya funksiyasi
 * @param {Object} schema - Joi validatsiya sxemasi
 * @returns {Function} - Middleware funksiyasi
 */
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body); // Request ma'lumotlarini tekshirish
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Agar xatolik bo‘lsa, 400 status qaytarish
  }
  next(); // Agar xatolik bo‘lmasa, keyingi middleware-ga o'tish
};

// Middleware funksiyalarini eksport qilish
module.exports = {
  validateRegister: validateRequest(registerSchema), // Ro‘yxatdan o‘tish validatsiyasi
  validateLogin: validateRequest(loginSchema), // Login validatsiyasi
  validateVerifyOTP: validateRequest(verifyOTPSchema), // OTP tasdiqlash validatsiyasi
  validateUpdateUser: validateRequest(updateUserSchema), // Foydalanuvchini yangilash validatsiyasi
  validateCreateProduct: validateRequest(createProductSchema), // Mahsulot yaratish validatsiyasi
  validateUpdateProduct: validateRequest(updateProductSchema), // Mahsulotni yangilash validatsiyasi
  validateCreateOrder: validateRequest(createOrderSchema), // Buyurtma yaratish validatsiyasi
  validateCreateComment: validateRequest(createCommentSchema), // Izoh yaratish validatsiyasi
};
