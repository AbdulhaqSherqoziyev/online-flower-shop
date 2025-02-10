const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateToken } = require('../utils/generateToken');
const { sendEmail } = require('../utils/sendEmail');

// Ro'yxatdan o'tish
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });

    // OTP yaratish va yuborish
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ userId: user._id, code: otp, expiresAt: Date.now() + 600000 });
    await sendEmail(email, 'OTP Code', `Your OTP code is ${otp}`);

    res.status(201).json({ message: 'User registered. Check your email for OTP.' });
  } catch (err) {
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

// Kirish
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) throw new Error('Invalid credentials');

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};