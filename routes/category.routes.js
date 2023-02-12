import express from "express";
import categoryController from "../controllers/category.controller.js";
import { CategoryMiddleware } from "../middleware/category.middleware.js";
import { checkAuthentication } from '../middleware/index.js'

const router = express.Router();

// Get Category
router.get('/', checkAuthentication, categoryController.index);

// Create Category
router.post('/create', checkAuthentication, CategoryMiddleware.create, categoryController.store);

// Edit Category
router.get('/edit/:id', checkAuthentication, CategoryMiddleware.edit, categoryController.edit);

// Update Category
router.put('/update/:id', checkAuthentication, CategoryMiddleware.update, categoryController.update);

// Delete Category
router.delete('/delete/:id', checkAuthentication, CategoryMiddleware.edit, categoryController.delete);

// Update User Status
router.put('/:id/:status', checkAuthentication, CategoryMiddleware.status, categoryController.status);

export default router;