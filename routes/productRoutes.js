const express = require('express');
const productController = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware'); // ✅ `protect` va `admin` ni import qildik

const router = express.Router();

// Mahsulotlarni hamma ko‘ra oladi
router.get('/', productController.getAllProducts);

// mahsulotni id orqali ko‘ra oladi
router.get('/:id', productController.getProductById);

// Faqat admin mahsulot qo‘shishi mumkin
router.post('/', protect, admin, productController.createProduct);

// Faqat admin mahsulotni o‘zgartirishi mumkin
router.put('/:id', protect, admin, productController.updateProduct);

// Faqat admin mahsulotni o‘chirishi mumkin
router.delete('/:id', protect, admin, productController.deleteProduct);

module.exports = router;
