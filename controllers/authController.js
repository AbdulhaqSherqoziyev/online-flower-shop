const bcrypt = require('bcrypt');
const User = require('../models/User');
const OTP = require('../models/OTP');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');


exports.register = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body; // role uchun default qiymat

  try {
    // 1. Email allaqachon mavjudligini tekshirish
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // 2. Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Yangi foydalanuvchini yaratish
    const user = await User.create({ name, email, password: hashedPassword, role });

    // 4. OTP yaratish va yuborish
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ userId: user._id, code: otp, expiresAt: Date.now() + 600000 });
    await sendEmail(email, 'OTP Code', `Your OTP code is ${otp}`);

    res.status(201).json({ message: 'User registered. Check your email for OTP.' });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// OTP ni tasdiqlash
exports.verifyOTP = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const otp = await OTP.findOne({ userId: user._id, code });
    if (!otp || otp.expiresAt < Date.now()) throw new Error('Invalid or expired OTP');

    user.isVerified = true;
    await user.save();
    await OTP.deleteOne({ _id: otp._id });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Kirish (Login)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    bcrypt.compare(password, user.password)
    .then((val) => {
      if (!val) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      res.status(200).json({ token });
    }).catch((err) => {
      res.status(400).json({ error: 'Invalid credentials' });
    })
    // if (!user || !(await user.comparePassword(password))) throw new Error('Invalid credentials');

    // const token = generateToken(user._id);
    // res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Foydalanuvchi o‘z profilini olish
exports.getProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.user._id, { name: 1, email: 1, isVerified: 1 });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Foydalanuvchi o‘z profilini o‘chirish (Adminlar uchun)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, isVerified: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Foydalanuvchi o‘z profilini yangilash
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Foydalanuvchi o‘z profilini o‘chirish
exports.deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Admin foydalanuvchini o‘chirish
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};