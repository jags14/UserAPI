const express = require('express');
const router = express.Router();
const authController = require('../auth/auth.controller');
const auth = require('../../middlewares/auth');
const authLimiter = require('../../middlewares/authLimiter');

router.post('/login', authLimiter.limit, authController.loginUser);
router.post('/refresh', authController.refresh);
router.post('/logout', auth.protect, authController.logout);

module.exports = router;