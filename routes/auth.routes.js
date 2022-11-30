const express = require('express');
const router = express.Router();
const authController = require('../controllers/login.controller');


router.post('/login', authController.login)
router.get('/getdata', authController.getLoginData)

module.exports = router;