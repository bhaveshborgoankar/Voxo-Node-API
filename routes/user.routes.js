import express from "express";
import userController from "../controllers/user.controller.js";
import { checkAuthentication } from "../middleware/index.js";
import { isEmailExist } from "../validation/index.js";

const router = express.Router();

// Get Users
router.get('/users', checkAuthentication, userController.index);

// Create User
router.post('/create', isEmailExist, userController.store);

// Edit User
router.get('/:id', checkAuthentication, userController.edit);

// Edit User
router.put('/edit/:id', userController.update);

// Delete User
router.delete('/delete/:id', checkAuthentication, userController.delete);

export default router;

