const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Kullanıcı modelini içe aktar

// Kullanıcı kaydı için POST işlemi
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Kullanıcıyı veritabanına ekle
    const newUser = new User({ username, password, email });

    // Kullanıcıyı kaydet
    await newUser.save();

    // Başarılı yanıt
    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Kullanıcı oluşturulurken bir hata oluştu.' });
  }
});

module.exports = router;
