import express from "express";
import categoryController from "../controllers/category.controller.js";
import { checkAuthentication } from '../middleware/index.js'

const router = express.Router();

// Create
router.post('/create', checkAuthentication, categoryController.store);

// Get Category
router.get('/get', checkAuthentication, categoryController.index);

// Edit Category
router.get('/:id', checkAuthentication, categoryController.edit)

// Update Category
router.put('/edit/:id', checkAuthentication, categoryController.update);

// Delete
router.delete('/delete/:id', categoryController.delete);

export default router;