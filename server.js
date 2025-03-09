const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

// Statik dosyalar
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Kullanıcı veritabanı (geçici olarak bellekte tutuyoruz)
const users = [];

// Ana sayfa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Giriş sayfası
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Log Bot sayfası
app.get('/log-bot', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'log-bot.html'));
});

// Kullanıcı kaydı
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ error: 'Kullanıcı zaten var.' });
  }
  users.push({ username, password });
  res.json({ message: 'Kayıt başarılı.' });
});

// Kullanıcı girişi
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre.' });
  }
  res.json({ message: 'Giriş başarılı.' });
});

// Log çekme endpoint'i
app.get('/api/logs', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL gereklidir.' });
  }

  // Python kodunu çalıştır
  exec(python3 security_bot.py "${url}", (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ logs: stdout });
  });
});

app.listen(PORT, () => {
  console.log(Sunucu http://localhost:${PORT} adresinde çalışıyor...);
});