import express from 'express'
import authController from '../controllers/auth.controller.js';
import { FinalResult, validateLogin, isEmailExist } from '../validation/index.js';
const router = express.Router();

router.post('/register', [isEmailExist, validateLogin, FinalResult], authController.register)
router.post('/login', validateLogin, authController.login)

export default router
