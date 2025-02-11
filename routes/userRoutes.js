const express = require('express');
const userController = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware'); // ❗ `admin` noto‘g‘ri import qilingan bo‘lishi mumkin

const router = express.Router();

// Foydalanuvchi o‘z ma’lumotlarini yangilashi
router.put('/', protect, userController.updateUser);

// Foydalanuvchi o‘z profilini o‘chirish
router.delete('/', protect, userController.deleteUser);

module.exports = router;
