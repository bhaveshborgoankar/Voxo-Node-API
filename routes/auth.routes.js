import express from 'express'
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Forgot Password
router.post('/forgetPassword', authController.forgetPassword);

// Reset Password
router.get('/resetPassword', authController.resetPassword);

export default router;
