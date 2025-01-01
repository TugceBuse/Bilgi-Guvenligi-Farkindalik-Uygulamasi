const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const dotenv = require('dotenv');

dotenv.config();

// Kullanıcı kaydı
exports.registerUser = async (req, res) => {
    try {
      const { firstName, lastName, username, password, email } = req.body;
  
      // Email veya username kontrolü
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Bu email veya kullanıcı adı zaten kullanılıyor.' });
      }
  
      // Kullanıcı oluştur ve kaydet
      const newUser = new User({ firstName, lastName, username, email, password });
      await newUser.save(); // Şifre burada hashlenir
  
      res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu!', user: newUser });
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
  const { id } = req.params; // Güncellenmesi istenen kullanıcı ID'si
  const { firstName, lastName, email, username, password } = req.body; // Güncellenecek alanlar

  try {
    // Güncellenecek veriler
    const updatedData = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı ID.' });
    }
    if (req.user.id !== id) {
      return res.status(403).json({ error: 'Bu kullanıcıyı güncelleme yetkiniz yok.' });
    }

    // Alanları kontrol ederek ekle
    if (firstName) updatedData.firstName = firstName;
    if (lastName) updatedData.lastName = lastName;
    if (email) updatedData.email = email;
    if (username) updatedData.username = username;

    // Eğer şifre güncelleniyorsa hash işlemi yap
    if (password) {
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          error: 'Şifre en az 8 karakter uzunluğunda, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.'
        });
      }
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    // Kullanıcıyı bul ve güncelle
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      updatedData, 
      { new: true, runValidators: true } // Yeni belgeyi döndür ve validasyon uygula
    );

    // Eğer kullanıcı bulunamazsa
    if (!updatedUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Başarılı yanıt
    res.status(200).json({
      message: 'Kullanıcı başarıyla güncellendi!',
      user: updatedUser,
    });
  } catch (err) {
    // Hata yönetimi
    console.error(err);
    if (err.code === 11000) {
      // Benzersizlik (unique) hatası
      return res.status(400).json({ error: 'Email veya kullanıcı adı zaten kullanılıyor.' });
    }
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
      { expiresIn: process.env.JWT_EXPIRE || '1h' }
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


//şifre sıfırlama ve mail gönderme işlemi ayarlanacak
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Kullanıcıyı email ile bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Token oluştur
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Token'ı hash'le ve kullanıcıya kaydet
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token 10 dakika geçerli

    await user.save();

    // Email gönderme işlemi (mock)
    console.log(`Şifre sıfırlama bağlantısı: http://your-app.com/reset-password?token=${resetToken}`);

    res.status(200).json({ message: 'Şifre sıfırlama bağlantısı gönderildi.' });
  } catch (err) {
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.query; // URL'den token alınır
  const { password } = req.body; // Yeni şifre alınır

  try {
    // Token'ı hash'le ve veritabanında kontrol et
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Token'ın süresi kontrol edilir
    });

    if (!user) {
      return res.status(400).json({ error: 'Token geçersiz veya süresi dolmuş.' });
    }

    // Güçlü şifre kontrolü
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ 
        error: 'Şifre en az 8 karakter uzunluğunda, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.' 
      });
    }

    // Şifreyi güncelle ve token'ı sıfırla
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Şifre başarıyla güncellendi.' });
  } catch (err) {
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
};
  

