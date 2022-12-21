import express from "express";
import userController from "../controllers/user.controller.js";
import uploadImg from "../helper/uploadFile.js";
import { checkAuthentication } from "../middleware/index.js";
import { isEmailExist } from "../validation/index.js";

const router = express.Router();

// Get Users
router.get('/users', checkAuthentication, userController.index);

// Create User
router.post('/create', isEmailExist, uploadImg.single("image"), userController.create);

// Edit User
router.get('/:id', checkAuthentication, userController.single);

// Edit User
router.put('/edit/:id', userController.edit);

// Delete User
router.delete('/delete/:id', checkAuthentication, userController.delete);

export default router;

