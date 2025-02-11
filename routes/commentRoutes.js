const express = require('express');
const commentController = require('../controllers/commentController');
const { validateCreateComment } = require('../middlewares/validationMiddleware');
const { protect, admin } = require('../middlewares/authMiddleware'); // ✅ To‘g‘ri import qilish

const router = express.Router();

// Foydalanuvchi sharh qoldirishi mumkin
router.post('/', protect, validateCreateComment, commentController.createComment);

// Barcha foydalanuvchilar sharhlarni ko‘rishi mumkin
router.get('/', commentController.getComments);

// Foydalanuvchi o‘zining sharhini ko‘rishi mumkin
router.get('/:id', protect, commentController.getComment);

// Foydalanuvchi faqat o‘z sharhini o‘zgartira oladi
router.put('/:id', protect, validateCreateComment, commentController.updateComment);

// ✅ Admin istalgan sharhni o‘chirishi mumkin
router.delete('/:id', protect, admin, commentController.deleteComment);

module.exports = router;
