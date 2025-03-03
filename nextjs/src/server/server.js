const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

// Kullanıcıları geçici olarak burada tutuyoruz
const users = [];

// Kullanıcı favori ve sepet verilerini tutacak objeler
const userFavorites = {};
const userCarts = {};
const userBalances = {};

// Rastgele kullanıcılar için veri
const randomUsers = Array(30).fill(null).map((_, index) => ({
  id: index + 1,
  name: 'basjdhbkasd',
  image: 'https://picsum.photos/id/783/400/400',
  price: Math.floor(Math.random() * 100) + 10 // 10-110 arası rastgele fiyat
}));

// Token doğrulama middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Ana sayfa için kullanıcıları getir
app.get('/api/users', (req, res) => {
  res.json(randomUsers);
});

// Kullanıcı bakiyesini getir
app.get('/api/balance', authenticateToken, (req, res) => {
  const balance = userBalances[req.user.userId] || 1000; // Varsayılan bakiye 1000
  res.json({ balance });
});

// Kullanıcı favorilerini getir
app.get('/api/favorites', authenticateToken, (req, res) => {
  const favorites = userFavorites[req.user.userId] || [];
  const favoriteItems = favorites.map(id => randomUsers.find(user => user.id === id));
  res.json(favoriteItems);
});

// Favorilere ekle/çıkar
app.post('/api/favorites/toggle', authenticateToken, (req, res) => {
  const { itemId } = req.body;
  const userId = req.user.userId;
  
  if (!userFavorites[userId]) {
    userFavorites[userId] = [];
  }

  const index = userFavorites[userId].indexOf(itemId);
  if (index > -1) {
    userFavorites[userId].splice(index, 1);
    res.json({ message: 'Removed from favorites' });
  } else {
    userFavorites[userId].push(itemId);
    res.json({ message: 'Added to favorites' });
  }
});

// Sepeti getir
app.get('/api/cart', authenticateToken, (req, res) => {
  const cart = userCarts[req.user.userId] || [];
  const cartItems = cart.map(id => randomUsers.find(user => user.id === id));
  res.json(cartItems);
});

// Sepete ekle
app.post('/api/cart/add', authenticateToken, (req, res) => {
  const { itemId } = req.body;
  const userId = req.user.userId;
  
  if (!userCarts[userId]) {
    userCarts[userId] = [];
  }

  userCarts[userId].push(itemId);
  res.json({ message: 'Added to cart' });
});

// Satın al
app.post('/api/purchase', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const cart = userCarts[userId] || [];
  const balance = userBalances[userId] || 1000;
  
  // Sepetteki ürünlerin toplam fiyatını hesapla
  const total = cart.reduce((sum, itemId) => {
    const item = randomUsers.find(user => user.id === itemId);
    return sum + item.price;
  }, 0);

  if (total > balance) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  // Bakiyeyi güncelle ve sepeti temizle
  userBalances[userId] = balance - total;
  userCarts[userId] = [];

  res.json({ 
    message: 'Purchase successful', 
    newBalance: userBalances[userId],
    total 
  });
});

// Kayıt ol
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    };
    users.push(user);

    // Yeni kullanıcı için bakiye oluştur
    userBalances[user.id] = 1000;

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Giriş yap
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 