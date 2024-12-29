const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    // Kullanıcı adı
    username: {
      type: String,
      required: [true, 'Kullanıcı adı gereklidir'],
      unique: true, // Benzersizlik
    },
    // Şifre
    password: {
      type: String,
      required: [true, 'Şifre gereklidir'],
      minlength: [8, 'Minimum 8 karakter içermelidir'],// Minimum uzunluk
      validate: {
        validator: validator.isStrongPassword, // Güçlü şifre kontrolü
        message: 'Şifre 1 büyük harf, 1 küçük harf, 1 sayı ve 1 özel karakter içermeli ve en az 8 karakter uzunluğunda olmalıdır',
      },
    },
    // Email
    email: {
      type: String,
      required: [true, 'Email gereklidir'],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Geçerli bir email adresi girin',
      },
    },
    // Puan
    score: {
      type: Number,
      default: 0,
    },
    // Kullanıcı rolü
    role: {
      type: String,
      enum: ['user', 'admin'], // Kullanıcı rolleri
      default: 'user', // Varsayılan rol
    },
    // Hesap durumu
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'], // Hesap durumları
      default: 'active', // Varsayılan durum
    },
    // Şifre kurtarma tokeni
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date, // Şifre kurtarma tokeni için süre
    },
  },
  { timestamps: true } // Oluşturulma ve güncellenme zamanı için otomatik alanlar
);

// Şifreyi kaydetmeden önce hash'leme işlemi
UserSchema.pre('save', async function (next) {
  // Eğer şifre değiştirilmişse veya yeni kullanıcı ekleniyorsa hash'le
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Salt değeri oluştur
    this.password = await bcrypt.hash(this.password, salt); // Şifreyi hash'le
    next();
  } catch (err) {
    next(err);
  }
});

// Şifre doğrulama fonksiyonu (login sırasında kullanılacak)
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};

// Kullanıcı modeli oluştur
const User = mongoose.model('User', UserSchema);

module.exports = User;
