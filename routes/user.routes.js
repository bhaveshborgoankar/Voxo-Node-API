import express from "express";
import userController from "../controllers/user.controller.js";
import { checkAuthentication } from "../middleware/index.js";

const router = express.Router();

// Get Users
router.get('/', checkAuthentication, userController.index);

// Create User
router.post('/create', checkAuthentication, userController.store);

// Edit User
router.get('/edit/:id', checkAuthentication, userController.edit);

// Update User
router.put('/update/:id', checkAuthentication, userController.update);

// Delete User
router.delete('/delete/:id', checkAuthentication, userController.delete);

// Update User Status
router.put('/:id/:status', checkAuthentication, userController.status)

export default router;