const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // ❗ `protect` to‘g‘ri import qilinganligiga ishonch hosil qiling

const router = express.Router();

// Ro‘yxatdan o‘tish (register) va OTP yuborish
router.post('/register', authController.register);

// OTP ni tasdiqlash
router.post('/verify-otp', authController.verifyOTP);

// Kirish (login)
router.post('/login', authController.login);

// Foydalanuvchi o‘z profilini olish
router.get('/profile', protect, authController.getProfile); // ❗ `authMiddleware` o‘rniga `protect` ishlating

// Foydalanuvchi o‘z profilini yangilash
router.put('/profile', protect, authController.updateProfile);

// Foydalanuvchi o‘z profilini o‘chirish
router.delete('/profile', protect, authController.deleteProfile);

module.exports = router;
