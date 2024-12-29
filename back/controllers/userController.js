const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı
exports.registerUser = async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      // Email veya username kontrolü
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Bu email veya kullanıcı adı zaten kullanılıyor.' });
      }
  
      // Kullanıcı oluştur ve kaydet
      const user = await User.create({ username, password, email });
  
      res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu!', user });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((el) => el.message);
        return res.status(400).json({ error: errors.join(', ') });
      }
  
      if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({ error: `Bu ${field} zaten kullanılıyor.` });
      }
  
      console.error(err); // Diğer hataları logla
      res.status(500).json({ error: 'Sunucu hatası.' });
    }
  };
  
  

// Kullanıcı silme
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // ID doğrulama
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID.' });
    }

    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json({ message: 'Kullanıcı başarıyla silindi!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kullanıcı silinirken bir hata oluştu.' });
  }
};

// Kullanıcı güncelleme
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { username, email, password } = req.body;

    // Şifre hash'leme
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json({ message: 'Kullanıcı başarıyla güncellendi!', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kullanıcı güncellenirken bir hata oluştu.' });
  }
};

// Kullanıcı girişi
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcı doğrulama
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Kullanıcı bulunamadı!' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Yanlış şifre!' });
    }

    // JWT oluşturma
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.status(200).json({
      message: 'Başarıyla giriş yaptınız!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
};
// Korunan bir route (örnek)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Şifre hariç tüm alanlar
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Profil alınırken bir hata oluştu.' });
  }
};
