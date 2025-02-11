const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware'); // ✅ To‘g‘ri import qilish

const router = express.Router();

// Foydalanuvchi yangi buyurtma yaratishi mumkin
router.post('/', protect, orderController.createOrder);

// Foydalanuvchi o‘z buyurtmalarini ko‘rishi mumkin
router.get('/', protect, orderController.getUserOrders);

// Foydalanuvchi o‘zining aniq buyurtmasini ko‘rishi mumkin
router.get('/:id', protect, orderController.getOrder);

// ✅ Admin buyurtmani o‘zgartirishi mumkin
router.put('/:id', protect, admin, orderController.updateOrder);

// ✅ Admin buyurtmani o‘chirishi mumkin
router.delete('/:id', protect, admin, orderController.deleteOrder);

module.exports = router;
