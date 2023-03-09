import express from "express";
import categoryController from "../controllers/category.controller.js";
import { checkAuthentication } from '../middleware/index.js'

const router = express.Router();

// Get Category
router.get('/', checkAuthentication, categoryController.index);

// Create Category
router.post('/create', checkAuthentication, categoryController.store);

// Edit Category
router.get('/edit/:id', checkAuthentication, categoryController.edit);

// Update Category
router.put('/update/:id', checkAuthentication, categoryController.update);

// Delete Category
router.delete('/delete/:id', checkAuthentication, categoryController.delete);

// Update User Status
router.put('/:id/:status', checkAuthentication, categoryController.status);

export default router;