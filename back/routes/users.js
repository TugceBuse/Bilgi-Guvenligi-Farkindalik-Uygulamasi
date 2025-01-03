const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');


const {
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  getUserProfile,
  updatePassword,
  verifyEmail,
  forgotPassword
} = require('../controllers/userController'); // userController içe aktar

// Kullanıcı işlemleri
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete',protect, deleteUser);
router.put('/update', protect, updateUser);
router.put('/update-password', protect, updatePassword);
router.get('/profile', protect, getUserProfile);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);

module.exports = router;
