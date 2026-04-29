const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');
const {
  getDashboard,
  getAdminPage,
  getManagerPage,
  getProfilePage,
} = require('../controllers/protectedController');

// Dashboard - كل اليوزرز المسجلين
router.get('/dashboard', verifyToken, getDashboard);

// Admin فقط
router.get('/admin', verifyToken, authorizeRoles('admin'), getAdminPage);

// Manager فقط
router.get('/manager', verifyToken, authorizeRoles('manager'), getManagerPage);

// User و Admin و Manager
router.get('/profile', verifyToken, authorizeRoles('user', 'admin', 'manager'), getProfilePage);

module.exports = router;