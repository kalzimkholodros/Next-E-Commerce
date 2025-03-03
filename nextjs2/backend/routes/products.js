const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, isAdmin } = require('../middleware/auth');

// Tüm ürünleri getirme
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).sort({ date: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Kategori bazlı ürünleri getirme
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }).sort({ date: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Tek bir ürün getirme
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Yeni ürün ekleme (sadece admin)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;

    const product = new Product({
      name,
      category,
      price,
      description,
      stock
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Ürün güncelleme (sadece admin)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { name, category, price, description, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price,
        description,
        stock
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Ürün silme (sadece admin)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }

    res.json({ message: 'Ürün başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router; 