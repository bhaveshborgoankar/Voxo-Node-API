import express from 'express'
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Forgot Password
router.post('/forgetPassword', authController.forgetPassword);

// Verify OTP
router.post('/verifyOtp', authController.verifyOTP)

// Reset Password
router.post('/resetPassword', authController.resetPassword);

export default router;
