import express from "express";
import blogController from "../controllers/blog.controller.js";
import { checkAuthentication } from '../middleware/index.js';

const router = express.Router();

// Get blogs
router.get('/blogs', checkAuthentication, blogController.index);

// Create Blog
router.post('/create', checkAuthentication, blogController.store);

// Edit Blog
router.get('/:id', checkAuthentication, blogController.edit);

// Update Blog
router.put('/edit/:id', checkAuthentication, blogController.update);

// Delete Blog
router.delete('/delete/:id', checkAuthentication, blogController.delete);

export default router;