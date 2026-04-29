const express = require('express');
const router = express.Router();
const { register, login, verify2FA } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/verify-2fa
router.post('/verify-2fa', verify2FA);

module.exports = router;