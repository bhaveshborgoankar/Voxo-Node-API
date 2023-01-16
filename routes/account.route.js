import express from "express";
import accountController from "../controllers/account.controller.js";
import { checkAuthentication } from '../middleware/index.js';

const router = express.Router();

// Get User Info
router.get('/getUerDetails', checkAuthentication, accountController.getUerDetails);

// Update Profile
router.put('/updateProfile', checkAuthentication, accountController.updateProfile);

// Update Password
router.put('/updatePassword', checkAuthentication, accountController.updatePassword);

export default router;