import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

// Create
router.post('/create_category', categoryController.create);

// Get Category
router.get('/get_category', categoryController.index);

// Edit
router.put('/edit_category', categoryController.edit);

// Delete
router.delete('/delete_category/:id', categoryController.delete);

export default router;