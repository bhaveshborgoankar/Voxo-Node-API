import express from 'express'
import authController from '../controllers/auth.controller.js';
import { FinalResult, validateLogin, isEmailExist } from '../validation/index.js';

const router = express.Router();

// Register
router.post('/register', [isEmailExist, validateLogin, FinalResult], authController.register);
// Login
router.post('/login', validateLogin, authController.login);
// Forgot Password
router.post('/forget_password', authController.forget_password)

export default router;
