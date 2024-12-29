const express = require('express');
const router = express.Router();
const {
  registerUser,
  deleteUser,
  updateUser,
  loginUser, // Giriş için eklendi
  getUserProfile // Korunan bir route için örnek
} = require('../controllers/userController'); // userController içe aktar

// Kullanıcı işlemleri
router.post('/register', registerUser); // Kullanıcı kaydı
router.post('/login', loginUser); // Kullanıcı girişi
router.delete('/:id', deleteUser); // Kullanıcı silme
router.put('/:id', updateUser); // Kullanıcı güncelleme
router.get('/profile', getUserProfile); // Korunan bir route örneği

module.exports = router;
