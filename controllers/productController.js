const Product = require('../models/Product');

// Barcha mahsulotlarni olish
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mahsulotni id or nom bilan ko‘rish
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Yangi mahsulot qo'shish
exports.createProduct = async (req, res) => {
  const { name, price, description, imageUrl, totalQuantity } = req.body;
  try {
    const product = await Product.create({ name, price, description, imageUrl, totalQuantity });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mahsulotni yangilash
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl, totalQuantity } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUrl, totalQuantity },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mahsulotni o'chirish
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};