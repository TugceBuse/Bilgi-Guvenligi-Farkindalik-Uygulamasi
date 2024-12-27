const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Kullanıcı modelini içe aktar
const mongoose = require('mongoose');

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

router.delete('/register/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ObjectId formatını doğrula
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID.' });
    }

    // Kullanıcıyı veritabanından sil
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Başarılı yanıt
    res.status(200).json({ message: 'Kullanıcı başarıyla silindi!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kullanıcı silinirken bir hata oluştu.' });
  }
});

module.exports = router;
