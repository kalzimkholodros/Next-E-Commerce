const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['elektrik', 'inşaat', 'beyaz eşya']
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 