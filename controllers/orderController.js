const Order = require('../models/Order');
const Product = require('../models/Product');

// Yangi buyurtma yaratish
exports.createOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    if (product.totalQuantity < quantity) throw new Error('Not enough products in stock');

    const totalPrice = product.price * quantity;
    const order = await Order.create({ userId: req.user._id, productId, quantity, totalPrice });

    product.totalQuantity -= quantity;
    await product.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Foydalanuvchining buyurtmalarini olish
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};