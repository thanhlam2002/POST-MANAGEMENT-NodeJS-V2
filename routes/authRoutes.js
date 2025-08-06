const express = require('express');
console.log('>>> authRoutes.js LOADED <<<');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
