import express from "express";
import userController from "../controllers/user.controller.js";
import uploadImg from "../helper/uploadFile.js";
import { isEmailExist, validateLogin } from "../validation/index.js";

const router = express.Router();

// Create User
router.post('/create', isEmailExist, uploadImg.single("image"), userController.create)

// Get Users
router.get('/users', userController.index);

// Edit User
router.put('/user/:id', userController.edit);

// Delete User
router.delete('/user/:id', userController.delete)

export default router

