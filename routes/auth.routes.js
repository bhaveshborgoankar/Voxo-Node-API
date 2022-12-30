import express from 'express'
import authController from '../controllers/auth.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register
router.post('/register', AuthMiddleware.register, authController.register);

// Login
router.post('/login', AuthMiddleware.login, authController.login);

// Forgot Password
router.post('/forgetPassword', AuthMiddleware.forgotPassword, authController.forgetPassword);

// Verify OTP
router.post('/verifyOtp', AuthMiddleware.verifyOtp, authController.verifyOTP)

// Reset Password
router.post('/resetPassword', AuthMiddleware.updatePassword, authController.resetPassword);

export default router;
