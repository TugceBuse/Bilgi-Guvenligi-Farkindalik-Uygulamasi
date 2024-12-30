const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');


const {
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  getUserProfile
} = require('../controllers/userController'); // userController içe aktar

// Kullanıcı işlemleri
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
