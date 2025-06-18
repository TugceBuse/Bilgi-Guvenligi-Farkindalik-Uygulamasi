// Gerekli kütüphaneleri dahil et
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Frontend ve Backend arasında CORS için
const dotenv = require('dotenv');  // .env dosyasını yüklemek için

// .env dosyasını yükle
dotenv.config();

// Express uygulaması oluştur
const app = express();

// CORS'u etkinleştir (eğer frontend ve backend farklı portlarda çalışıyorsa)
app.use(cors());

// JSON verisini kabul et
app.use(express.json());

// MongoDB bağlantı URI'sini almak için .env dosyasını kullanın
const mongoURI = process.env.MONGO_URI;

// MongoDB'ye bağlan
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Bağlantısı Başarılı'))
  .catch((err) => console.log('MongoDB Bağlantı Hatası: ', err));

// Basit bir test route'u (GET)
app.get('/', (req, res) => {
  res.send('Backend Çalışıyor!');
});

// Kullanıcı işlemleri için route'ları dahil et
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);  // Kullanıcı işlemleri için /api/users endpoint'i

// Oyun oturumu işlemleri için route'ları dahil et
const gameSessionRoutes = require('./routes/gameSessions');
app.use('/api/gamesessions', gameSessionRoutes); // oyun oturumları için endpoint

// Sunucu dinlemeye başla
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
