import express from "express";
import userController from "../controllers/user.controller.js";
import { CategoryMiddleware } from "../middleware/category.middleware.js";
import { checkAuthentication } from "../middleware/index.js";

const router = express.Router();

// Get Users
router.get('/users', checkAuthentication, userController.index);

// Create User
router.post('/create', checkAuthentication, CategoryMiddleware.create, userController.store);

// Edit User
router.get('/:id', checkAuthentication, userController.edit);

// Edit User
router.put('/edit/:id', checkAuthentication, userController.update);

// Delete User
router.delete('/delete/:id', checkAuthentication, userController.delete);

// Update User Status
router.put('/:id/:status', checkAuthentication, userController.status)

export default router;

