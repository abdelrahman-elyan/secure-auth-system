const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/userModel');
require('dotenv').config();

// ===== REGISTER =====
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // تأكد إن كل الحقول موجودة
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // تأكد إن الـ role صح
    const allowedRoles = ['admin', 'manager', 'user'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // تأكد إن الإيميل مش موجود
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash الباسورد
    const hashedPassword = await bcrypt.hash(password, 12);

    // إنشاء الـ 2FA secret
    const secret = speakeasy.generateSecret({
      name: `SecureAuth (${email})`,
    });

    // حفظ اليوزر في الداتابيز
    const result = await User.create(name, email, hashedPassword, role);
    const userId = result.insertId;

    // حفظ الـ 2FA secret
    await User.save2FASecret(userId, secret.base32);

    // توليد QR Code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    res.status(201).json({
      message: 'User registered successfully',
      qrCode: qrCodeUrl,
      secret: secret.base32,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===== LOGIN =====
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // البحث عن اليوزر
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // التحقق من الباسورد
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // الباسورد صح → طلب 2FA
    res.status(200).json({
      message: 'Password verified, please enter 2FA code',
      userId: user.id,
      requires2FA: true,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===== VERIFY 2FA =====
const verify2FA = async (req, res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // البحث عن اليوزر
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // التحقق من الـ 2FA code
    const isValid = speakeasy.totp.verify({
      secret: user.two_fa_secret,
      encoding: 'base32',
      token: token,
      window: 2,
    });

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid 2FA code' });
    }

    // كل حاجة صح → توليد JWT
    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, verify2FA };