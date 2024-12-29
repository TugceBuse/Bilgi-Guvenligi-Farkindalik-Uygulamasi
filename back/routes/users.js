const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Kullanıcı modelini içe aktar
const mongoose = require('mongoose');

// Kullanıcı kaydı için POST işlemi
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Kullanıcıyı veritabanına ekle
    await User.create({ username, password, email });


    // const newUser = new User({ username, password, email });

    // // Kullanıcıyı kaydet
    // await newUser.save();

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

// Kullanıcı güncelleme
router.put('/register/:id', async (req, res) => {
  try {
    const { id } = req.params; // Güncellenecek kullanıcının ID'si
    const { username, email, password } = req.body; // Güncellenecek alanlar

    // Kullanıcıyı bul ve güncelle
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true, runValidators: true } // Güncellenmiş belgeyi döndür ve doğrulama yap
    );

    // Eğer kullanıcı bulunamazsa
    if (!updatedUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Başarılı yanıt
    res.status(200).json({ message: 'Kullanıcı başarıyla güncellendi!', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kullanıcı güncellenirken bir hata oluştu.' });
  }
});

module.exports = router;
