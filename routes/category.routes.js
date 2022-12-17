import express from "express";
// import uploadImg from "../helper/uploadFile.js";
import categoryController from "../controllers/category.controller.js";
import { checkAuthentication } from '../middleware/index.js'

const router = express.Router();

// Create
// router.post('/create', checkAuthentication, uploadImg.single("image"), categoryController.create);
router.post('/create', checkAuthentication, categoryController.create);

// Get Category
router.get('/get', checkAuthentication, categoryController.index);

// Edit
router.put('/edit/:id', checkAuthentication, categoryController.edit);

// Delete
router.delete('/delete/:id', categoryController.delete);

export default router;