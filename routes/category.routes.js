import express from "express";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post('/create_category', categoryController.create);

export default router;