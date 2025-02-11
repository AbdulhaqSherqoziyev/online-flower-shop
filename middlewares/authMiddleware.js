const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Foydalanuvchini autentifikatsiya qilish
const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Admin huquqlarini tekshirish middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Admin bo‘lsa, davom etadi
  } else {
    res.status(403).json({ error: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
