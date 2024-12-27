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



// Kullanıcı silinmeden önce çalışacak fonksiyon
UserSchema.pre('findOneAndDelete', async function (next) {
  try {
    // Silinmekte olan kullanıcının bilgilerini al
    const user = await this.model.findOne(this.getFilter());
    if (user) {
      console.log(`User with ID "${user._id}" is being deleted.`);
      
      // Kullanıcıyla ilişkili verileri temizleme işlemi
      // Örnek: İlgili modellerden verileri temizleyebilirsiniz
      // await RelatedModel.deleteMany({ userId: user._id });
    }
    next();
  } catch (error) {
    next(error);
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
