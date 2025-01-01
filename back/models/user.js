const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    // Ad
    firstName: {
      type: String,
      required: [true, 'Ad gereklidir'],
      uppercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          // Birden fazla kelime arasında boşluk olabilir
          return /^[a-zA-ZğüşöçİĞÜŞÖÇ]+(\s[a-zA-ZğüşöçİĞÜŞÖÇ]+)*$/.test(value);
        },
        message: 'Ad yalnızca harflerden oluşmalı ve aralarında birer boşluk bulunmalıdır',
      },
    },
    // Soyad
    lastName: {
      type: String,
      required: [true, 'Soyad gereklidir'],
      uppercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          // Tek kelime ve boşluk içeremez
          return /^[a-zA-ZğüşöçİĞÜŞÖÇ]+$/.test(value);
        },
        message: 'Soyad yalnızca tek bir kelimeden oluşmalı ve boşluk içermemelidir',
      },
    },
    // Kullanıcı adı
    username: {
      type: String,
      required: [true, 'Kullanıcı adı gereklidir'],
      unique: true, // Benzersizliği doğrula
      minlength: [4, 'Şifre minimum 4 karakter içermelidir'],
      trim: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9_]+$/.test(value);
        },
        message: 'Kullanıcı adı yalnızca harf, rakam veya alt çizgi (_) içerebilir',
      },
    },
    // Email
    email: {
      type: String,
      required: [true, 'Email gereklidir'],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Geçerli bir email adresi girin',
      },
    },
    // Şifre
    password: {
      type: String,
      required: [true, 'Şifre gereklidir'],
      minlength: [8, 'Şifre minimum 8 karakter içermelidir'],
      validate: {
        validator: validator.isStrongPassword, // Güçlü şifre kontrolü
        message:
          'Şifre 1 büyük harf, 1 küçük harf, 1 sayı ve 1 özel karakter içermeli ve en az 8 karakter uzunluğunda olmalıdır',
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
      enum: ['user', 'admin'],
      default: 'user',
    },
    // Hesap durumu
    status: {
      type: String,
      enum: ['active', 'inactive', 'banned'], // Hesap durumları
      default: 'active',
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

// Kullanıcı adı doğrulaması, büyük-küçük harf fark etmeksizin unique
UserSchema.path('username').validate(async function (value) {
  const count = await mongoose.models.User.countDocuments({
    username: value.toLowerCase(),
  });
  return count === 0;
}, 'Bu kullanıcı adı zaten alınmış.');

// Şifreyi kaydetmeden önce hash'leme işlemi
UserSchema.pre('save', async function (next) {
  console.log("Pre-save middleware çalışıyor...");
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error("Şifre hashleme sırasında hata:", err);
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


const User = mongoose.model('User', UserSchema);

module.exports = User;
