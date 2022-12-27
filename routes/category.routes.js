import express from "express";
import categoryController from "../controllers/category.controller.js";
import { checkAuthentication } from '../middleware/index.js'

// const router = express.Router();
const router = express.Router();

// Get Category
router.get('/categories', checkAuthentication, categoryController.index);

// Create
router.post('/create', checkAuthentication, categoryController.store);

// Edit Category
router.get('/:id', checkAuthentication, categoryController.edit)

// Update Category
router.put('/edit/:id', checkAuthentication, categoryController.update);

// Delete
router.delete('/delete/:id', checkAuthentication, categoryController.delete);

export default router;