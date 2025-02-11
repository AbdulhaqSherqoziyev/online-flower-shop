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

// Buyurtmani olish
exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('productId');
    if (!order) throw new Error('Order not found');
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buyurtmani tahrirlash
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { productId, quantity }, { new: true }).populate('productId');
    if (!order) throw new Error('Order not found');

    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const totalPrice = product.price * quantity;
    order.totalPrice = totalPrice;
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buyurtmani o'chirish
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) throw new Error('Order not found');

    const product = await Product.findById(order.productId);
    if (!product) throw new Error('Product not found');

    product.totalQuantity += order.quantity;
    await product.save();

    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};