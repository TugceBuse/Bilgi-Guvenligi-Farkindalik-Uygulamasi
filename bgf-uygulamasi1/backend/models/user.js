const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Kullanıcı modelini tanımla
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  score: { type: Number, default: 0 }  // Başlangıç puanı 0
});

// Şifreyi kaydetmeden önce hash'leme işlemi
UserSchema.pre('save', async function(next) {
  // Eğer şifre değiştirilmişse, hash'le
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Salt değeri, hash'in güvenliğini artırır
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Şifre doğrulama fonksiyonu (login sırasında kullanılacak)
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// Mongoose modeli oluştur
const User = mongoose.model('User', UserSchema);

module.exports = User;  // Modeli dışa aktar
