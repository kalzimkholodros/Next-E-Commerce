const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Kayıt olma
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Email kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Bu email adresi zaten kullanımda.' });
    }

    // Yeni kullanıcı oluşturma
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Token oluşturma
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Giriş yapma
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcı kontrolü
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email veya şifre hatalı.' });
    }

    // Şifre kontrolü
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email veya şifre hatalı.' });
    }

    // Token oluşturma
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Kullanıcı bilgilerini getirme
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router; 